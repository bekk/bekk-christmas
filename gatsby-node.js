const path = require(`path`);

exports.createPages = async ({ actions, graphql, reporter }) => {
    const frontpageTemplate = path.resolve(`src/templates/frontpage.js`);
    const blogPostTemplate = path.resolve(`src/templates/post.js`);
    const calendarTemplate = path.resolve(`src/templates/calendar.js`);

    const { createPage } = actions;

    const result = await graphql(`
        {
            allMarkdownRemark(limit: 1000) {
                nodes {
                    frontmatter {
                        post_day
                        post_year
                        calendar
                    }
                    id
                }
            }
        }
    `);

    // Handle errors
    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`);
        return;
    }

    const calendarSet = new Set();
    const envCalendar = process.env.CALENDAR_ENV;

    // Frontpage for bekk.christmas
    if (!envCalendar) {
        createPage({
            path: '/',
            component: frontpageTemplate,
        });
    }

    if (envCalendar) {
        // Create frontpage of current calendar
        createPage({
            path: '/',
            component: calendarTemplate,
            context: {
                year: 2019,
                calendar: envCalendar,
            },
        });
        calendarSet.add(`${envCalendar}${2019}`);

        const posts = result.data.allMarkdownRemark.nodes.filter(node => node.frontmatter.calendar);
        posts.forEach(node => {
            const { calendar, post_year, post_day } = node.frontmatter;

            const isEnvCalendar = process.env.CALENDAR_ENV === calendar;

            if (envCalendar && !isEnvCalendar) {
                // Filter posts from other calendars
                return;
            }

            // Path to each calendar
            let calendarPath = '';
            if (!isEnvCalendar) {
                calendarPath = `/${calendar}`;
            }
            if (post_year !== 2019) {
                calendarPath += `/${post_year}`;
            }

            // Create page for each post
            createPage({
                path: `${calendarPath}/${post_day}`,
                component: blogPostTemplate,
                context: {
                    id: node.id,
                },
            });

            // Create page for each calendar
            const mapKey = `${calendar}${post_year}`;
            if (!calendarSet.has(mapKey)) {
                console.log(calendarPath);
                // Only create page for each calendar once
                createPage({
                    path: calendarPath,
                    component: calendarTemplate,
                    context: {
                        year: post_year,
                        calendar: calendar,
                    },
                });
                calendarSet.add(mapKey);
            }
        });
    }
};

// Run after all nodes have been created
exports.sourceNodes = ({ actions, getNodes, getNode }) => {
    const { createNodeField } = actions;

    connectAuthorsToPosts(getNode, getNodes, createNodeField);
};

const connectAuthorsToPosts = (getNode, getNodes, createNodeField) => {
    // Get all post nodes
    const postNodes = getNodes().filter(
        node => node.internal.type === 'MarkdownRemark' && node.frontmatter.calendar
    );

    // Get all author nodes
    const authorNodes = getNodes().filter(
        node => node.internal.type === 'MarkdownRemark' && !node.frontmatter.calendar
    );

    // Add author information to each post
    postNodes.forEach(post => {
        const { authors = [] } = post.frontmatter;

        const enrichedAuthors = authors.map(author => {
            const match = authorNodes.find(node => author === node.frontmatter.title);
            const { title, description, twitterHandle, avatar } = match.frontmatter;

            return {
                title,
                description,
                twitterHandle,
                avatar,
            };
        });

        if (enrichedAuthors) {
            createNodeField({
                node: getNode(post.id),
                name: 'enrichedAuthors',
                value: enrichedAuthors,
            });
        }
    });
};
