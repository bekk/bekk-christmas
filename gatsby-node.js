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

    const envCalendar = process.env.CALENDAR_ENV || process.argv[3];
    const isPreview = envCalendar === 'preview';
    const calendarsWithContent = new Set();

    const currentDate = new Date();
    const currentYear = currentDate.getUTCFullYear();
    const currentMonth = currentDate.getUTCMonth();
    const currentDay = currentDate.getUTCDate();

    if (envCalendar) {
        // Create frontpage of current calendar
        const calendars = {};

        const posts = result.data.allMarkdownRemark.nodes.filter(node => node.frontmatter.calendar);

        posts.forEach(node => {
            const { calendar, post_year, post_day } = node.frontmatter;

            // Filter posts from other calendars
            const showCalendar = envCalendar === calendar || isPreview;
            if (envCalendar && !showCalendar) {
                return;
            }

            let hideWindowsAfterDay = 0;
            if (currentYear > post_year || isPreview) {
                hideWindowsAfterDay = 24;
            } else if (currentMonth === 11) {
                hideWindowsAfterDay = currentDay;
            }

            // Path to each calendar
            let calendarPath = '';

            if (isPreview) {
                calendarPath = `/${calendar}`;
            }

            // Create page for each post
            if (post_day <= hideWindowsAfterDay)
                createPage({
                    path: `${calendarPath}/${post_year}/${post_day}`,
                    component: blogPostTemplate,
                    context: {
                        id: node.id,
                    },
                });

            if (post_year !== 2019) {
                calendarPath += `/${post_year}`;
            }

            if (!calendarPath) {
                calendarPath = '/';
            }

            // Add each unique calendar path to the `calendars` object.
            // We'll create the actual calendar pages below
            calendars[calendarPath] = {
                year: post_year,
                calendar: calendar,
                hideWindowsAfterDay: hideWindowsAfterDay,
                includeCalendarInPath: isPreview,
            };
            calendarsWithContent.add(calendarPath);
        });

        // create calendar pages for all unique calendar years
        Object.entries(calendars).forEach(([calendarPath, context]) => {
            const relatedCalendarPaths = Array.from(
                new Set(
                    posts
                        .filter(
                            post =>
                                post.frontmatter.calendar === context.calendar &&
                                post.frontmatter.post_year !== context.year
                        )
                        .map(post => {
                            let path = isPreview ? `/${context.calendar}` : '';
                            return post.frontmatter.post_year === 2019
                                ? path
                                : `${path}/${post.frontmatter.post_year}`;
                        })
                )
            );
            createPage({
                path: calendarPath,
                component: calendarTemplate,
                context: {
                    ...context,
                    relatedCalendarPaths,
                },
            });
        });
    }

    let currentFrontpageDay = 0;
    if (currentYear > 2019 || (currentMonth === 11 && currentDay > 24)) {
        currentFrontpageDay = 24;
    } else if (currentMonth === 11 && currentDay < 25) {
        currentFrontpageDay = currentDay;
    }

    // Show the next day for preview.bekk.christmas
    if (currentFrontpageDay < 24 && isPreview) {
        currentFrontpageDay += 1;
    }

    // Frontpage for bekk.christmas
    if (!envCalendar || isPreview) {
        createPage({
            path: '/',
            component: frontpageTemplate,
            context: {
                calendarsWithContent: Array.from(calendarsWithContent),
                day: currentFrontpageDay,
                year: 2019,
            },
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
        const { authors = [], title } = post.frontmatter;

        const enrichedAuthors = authors.map(author => {
            const match = authorNodes.find(node => author === node.frontmatter.title);
            if (!match) {
                console.error(
                    `Author not found! The author for the post "${title}" was set to "${author}", but there is no such author. This will typically happen if the author updates their name. To fix this, please check the author file for the author(s) in question and change the name in the post accordingly.`
                );
                throw new Error(
                    "Could not build, because there was a post that didn't have a matching author name. See logs for more info."
                );
            }
            return match.frontmatter;
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
