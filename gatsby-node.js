const path = require(`path`);

// This has to be changed every year
const THIS_YEAR = 2020;

exports.createPages = async ({ actions, graphql, reporter }) => {
    const frontpageTemplate = path.resolve(`src/templates/frontpage.js`);
    const blogPostTemplate = path.resolve(`src/templates/post.js`);
    const calendarTemplate = path.resolve(`src/templates/calendar.js`);
    const searchTemplate = path.resolve(`src/templates/search.js`);
    const redirectTemplate = path.resolve(`src/templates/redirect.js`);

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
            siteSearchIndex {
                index
            }
        }
    `);

    // Handle errors
    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`);
        return;
    }

    const envCalendar = process.env.CALENDAR_ENV;
    const isPreview = envCalendar === 'preview';
    const calendarsWithContent = new Set();

    const currentDate = new Date();
    const currentYear = currentDate.getUTCFullYear();
    const currentMonth = currentDate.getUTCMonth();
    const currentDay = currentDate.getUTCDate();

    if (envCalendar) {
        // Create frontpage of current calendar
        const calendars = {};

        const posts = result.data.allMarkdownRemark.nodes.filter(
            (node) => node.frontmatter.calendar
        );

        // Create each post
        posts.forEach((node) => {
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
                        isPreview,
                        showPrevLink: post_day > 1,
                        showNextLink: post_day !== hideWindowsAfterDay,
                    },
                });

            calendarPath += `/${post_year}`;

            // Add each unique calendar path to the `calendars` object.
            // We'll create the actual calendar pages below
            calendars[calendarPath] = {
                year: post_year,
                calendar: calendar,
                hideWindowsAfterDay: hideWindowsAfterDay,
                isPreview,
            };
            calendarsWithContent.add(calendarPath);
        });

        let createdRedirects = {};

        // create calendar pages for all unique calendar years
        Object.entries(calendars).forEach(([calendarPath, context]) => {
            const postsFromThisCalendar = posts.filter(
                (post) => post.frontmatter.calendar === context.calendar
            );
            // First, we get the paths of calendar years that has the same name
            // but a different year. For React, for example, we get /2018 and
            // /2017 when we're building this year's React calendar. For ML,
            // we don't get anything, because they only have a single year of
            // content (well, so far).
            const relatedCalendarPaths = Array.from(
                new Set(
                    postsFromThisCalendar
                        .filter((post) => post.frontmatter.post_year !== context.year)
                        .map((post) => {
                            let path = isPreview ? `/${context.calendar}` : '';
                            return `${path}/${post.frontmatter.post_year}`;
                        })
                )
            );

            // Figure out what the newest year of a calendar is
            const latestYear = Math.max(
                ...postsFromThisCalendar.map((post) => post.frontmatter.post_year)
            );

            // Create redirect for the base URL
            if (!createdRedirects[context.calendar]) {
                // We only create one root route per calendar
                // so for react.christmas, this loop will be run 4 times, but
                // we still only want it to run once. That's why we use the
                // createdRedirects object to "register" each calendar as
                // created.
                createPage({
                    path: isPreview ? `/${context.calendar}` : '/',
                    component: redirectTemplate,
                    context: {
                        ...context,
                        redirectTo: isPreview
                            ? `/${context.calendar}/${latestYear}`
                            : `/${latestYear}`,
                    },
                });
                createdRedirects[context.calendar] = true;
            }

            // Finally, we call `createPage` to create the actual calendar page
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
    if (currentYear > THIS_YEAR || (currentMonth === 11 && currentDay > 24)) {
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
                year: THIS_YEAR,
                isPreview,
                siteSearchIndex: result.data.siteSearchIndex,
            },
        });
    }

    // Search results page
    createPage({
        path: '/search',
        component: searchTemplate,
        context: {
            isPreview,
            siteSearchIndex: result.data.siteSearchIndex,
        },
    });
};
