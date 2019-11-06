/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

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
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/post/javascript`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/post/react`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/post/kotlin`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/post/opensource`,
            },
        },
        `gatsby-transformer-remark`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-styled-components`,
        `gatsby-plugin-netlify`,
        /* Your site config here */
    ],
};
