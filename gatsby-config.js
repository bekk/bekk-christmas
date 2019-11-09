/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const fs = require('fs');

const calendarPlugins = fs
    .readdirSync(`${__dirname}/post`, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .map(calendar => ({
        resolve: `gatsby-source-filesystem`,
        options: {
            path: `${__dirname}/post/${calendar}`,
        },
    }));

module.exports = {
    plugins: [
        ...(process.env.CALENDAR_ENV !== 'preview' ? [] : [`gatsby-plugin-netlify-cms`]),
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/authors`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [`gatsby-remark-responsive-iframe`],
            },
        },
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-styled-components`,
        `gatsby-plugin-netlify`,
        /* Your site config here */
        ...calendarPlugins,
    ],
};
