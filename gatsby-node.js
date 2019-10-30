const path = require(`path`);
const blogPostTemplate = path.resolve(`src/templates/post.js`);
const calendarTemplate = path.resolve(`src/templates/calendar.js`);
const frontpageTemplate = path.resolve(`src/templates/frontpage.js`);

exports.createPages = async ({ actions, graphql, reporter }) => {
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
    const hasEnvCalendar = process.env.CALENDAR_ENV;

    // Frontpage for bekk.christmas
    if (!hasEnvCalendar) {
        createPage({
            path: '/',
            component: frontpageTemplate,
        });
    }

    result.data.allMarkdownRemark.nodes.forEach(node => {
        const { calendar, post_year, post_day } = node.frontmatter;

        const isEnvCalendar = process.env.CALENDAR_ENV === calendar;
        const startOfPath = isEnvCalendar ? '/' : `/${calendar}`;

        createPost(createPage, startOfPath, post_year, post_day, node.id);

        const mapKey = `${calendar}${post_year}`;

        if (!calendarSet.has(mapKey)) {
            createCalendar(createPage, startOfPath, calendar, post_year);
            calendarSet.add(mapKey);
        }
    });
};

const createPost = (createPage, startOfPath, year, day, id) => {
    let path = startOfPath;

    if (year !== 2019) {
        path += `/${year}`;
    }

    createPage({
        path: `${path}/${day}`,
        component: blogPostTemplate,
        context: {
            id: id,
        },
    });
};

const createCalendar = (createPage, startOfPath, calendar, year) => {
    let path = startOfPath;

    if (year !== 2019) {
        path += `/${year}`;
    }

    createPage({
        path: path,
        component: calendarTemplate,
        context: {
            year: year,
            calendar: calendar,
        },
    });
};
