/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const fs = require('fs');

// Adds every directory under post (not recursively) as its own filesystem
// source.
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

const envCalendar = process.env.CALENDAR_ENV || process.argv[3];
const isPreview = envCalendar === 'preview';

module.exports = {
    plugins: [
        ...(isPreview ? [`gatsby-plugin-netlify-cms`] : []),
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/authors`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    `gatsby-remark-responsive-iframe`,
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            aliases: {
                                sh: 'bash',
                                'f#': 'fsharp',
                            },
                        },
                    },
                    `gatsby-remark-emoji`,
                ],
            },
        },
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-styled-components`,
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: 'UA-153443114-1',
            },
        },
        `gatsby-plugin-netlify`,
        ...calendarPlugins,
    ],
};
