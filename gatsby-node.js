const path = require(`path`);

exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions;
    const blogPostTemplate = path.resolve(`src/templates/post.js`);
    const calendarTemplate = path.resolve(`src/templates/calendar.js`);
    const frontpageTemplate = path.resolve(`src/templates/frontpage.js`);

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
    const hasEnvCalendar = process.env.CALENDAR_ENV;

    if (!hasEnvCalendar) {
        createPage({
            path: '/',
            component: frontpageTemplate,
        });
    }

    result.data.allMarkdownRemark.nodes.forEach(node => {
        const { calendar, post_year, post_day } = node.frontmatter;

        const isEnvCalendar = process.env.CALENDAR_ENV === calendar;

        if (isEnvCalendar) {
            createPage({
                path: `/${post_year}/${post_day}`,
                component: blogPostTemplate,
                context: {
                    id: node.id,
                },
            });
        } else if (!hasEnvCalendar) {
            createPage({
                path: `/${calendar}/${post_year}/${post_day}`,
                component: blogPostTemplate,
                context: {
                    id: node.id,
                },
            });
        }

        const mapKey = `${calendar}${post_year}`;
        if (!hasEnvCalendar && !calendarSet.has(mapKey)) {
            let path = `/${calendar}`;

            if (post_year !== 2019) {
                path = `/${calendar}/${post_year}`;
            }

            createPage({
                path: path,
                component: calendarTemplate,
                context: {
                    year: post_year,
                    calendar: calendar,
                },
            });
            calendarSet.add(mapKey);
        } else if (isEnvCalendar && !calendarSet.has(mapKey)) {
            let path = '/';

            if (post_year !== 2019) {
                path = `/${post_year}`;
            }

            createPage({
                path: path,
                component: calendarTemplate,
                context: {
                    year: post_year,
                    calendar: calendar,
                },
            });
            calendarSet.add(mapKey);
        }
    });
};
