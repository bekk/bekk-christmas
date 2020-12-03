/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const fs = require('fs');
const feedPluginConfig = require('./config/feed-plugin-config');
const getMetadataForSite = require('./config/get-metadata-for-site');

const envCalendar = process.env.CALENDAR_ENV;
const isPreview = envCalendar === 'preview';
const isPreviewOrBekk = !envCalendar || isPreview;

// Adds every directory under post (not recursively) as its own filesystem
// source.
const calendarPlugins = fs
    .readdirSync(`${__dirname}/post`, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .filter((dirent) => isPreviewOrBekk || dirent.name === envCalendar) // Only source current calendar
    .map((dirent) => dirent.name)
    .map((calendar) => ({
        resolve: `gatsby-source-filesystem`,
        options: {
            path: `${__dirname}/post/${calendar}`,
        },
    }));

const currentDate = new Date();
const currentYear = currentDate.getUTCFullYear();
const currentMonth = currentDate.getUTCMonth();
const currentDay = currentDate.getUTCDate();

module.exports = {
    siteMetadata: getMetadataForSite(envCalendar),
    plugins: [
        ...(isPreview ? [`gatsby-plugin-netlify-cms`] : []),
        ...calendarPlugins,
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
                    `gatsby-remark-numbered-footnotes`,
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
        {
            resolve: `gatsby-plugin-feed`,
            options: feedPluginConfig(envCalendar),
        },
        isPreviewOrBekk && {
            resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
            options: {
                fields: [`title`, 'authors'],
                resolvers: {
                    MarkdownRemark: {
                        title: (node) => node.frontmatter.title,
                        authors: (node) => node.frontmatter.authors,
                        ingress: (node) => node.frontmatter.ingress,
                        image: (node) => node.frontmatter.image,
                        calendar: (node) => node.frontmatter.calendar,
                        post_year: (node) => node.frontmatter.post_year,
                        post_day: (node) => node.frontmatter.post_day,
                    },
                },
                filter: (node) =>
                    node.frontmatter.post_year < currentYear ||
                    (node.frontmatter.post_year === currentYear &&
                        currentMonth === 11 &&
                        node.frontmatter.post_day <= currentDay),
            },
        },
    ].filter(Boolean),
};
