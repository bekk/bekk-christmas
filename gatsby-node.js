const path = require(`path`);

exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions;
    const blogPostTemplate = path.resolve(`src/templates/post.js`);
    const calendarTemplate = path.resolve(`src/templates/calendar.js`);

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

    const calendarMap = new Map();

    result.data.allMarkdownRemark.nodes.forEach(node => {
        const { calendar, post_year, post_day } = node.frontmatter;

        const mapKey = `${calendar}${post_year}`;
        if (!calendarMap.has(mapKey)) {
            createPage({
                path: `/${calendar}`,
                component: calendarTemplate,
                context: {
                    year: post_year,
                    calendar: calendar,
                },
            });
        }

        createPage({
            path: `/${calendar}/${post_year}/${post_day}`,
            component: blogPostTemplate,
            context: {
                id: node.id,
            },
        });
    });
};
