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
                            // Class prefix for <pre> tags containing syntax highlighting;
                            // defaults to 'language-' (eg <pre class="language-js">).
                            // If your site loads Prism into the browser at runtime,
                            // (eg for use with libraries like react-live),
                            // you may use this to prevent Prism from re-processing syntax.
                            // This is an uncommon use-case though;
                            // If you're unsure, it's best to use the default value.
                            classPrefix: 'language-',
                            // This is used to allow setting a language for inline code
                            // (i.e. single backticks) by creating a separator.
                            // This separator is a string and will do no white-space
                            // stripping.
                            // A suggested value for English speakers is the non-ascii
                            // character '›'.
                            inlineCodeMarker: null,
                            // This lets you set up language aliases.  For example,
                            // setting this to '{ sh: "bash" }' will let you use
                            // the language "sh" which will highlight using the
                            // bash highlighter.
                            aliases: {},
                            // This toggles the display of line numbers globally alongside the code.
                            // To use it, add the following line in gatsby-browser.js
                            // right after importing the prism color scheme:
                            //  require("prismjs/plugins/line-numbers/prism-line-numbers.css")
                            // Defaults to false.
                            // If you wish to only show line numbers on certain code blocks,
                            // leave false and use the {numberLines: true} syntax below
                            showLineNumbers: false,
                            // If setting this to true, the parser won't handle and highlight inline
                            // code used in markdown i.e. single backtick code like `this`.
                            noInlineHighlight: false,
                            // This adds a new language definition to Prism or extend an already
                            // existing language definition. More details on this option can be
                            // found under the header "Add new language definition or extend an
                            // existing language" below.
                            languageExtensions: [],
                            // Customize the prompt used in shell output
                            // Values below are default
                            prompt: {
                                user: 'root',
                                host: 'localhost',
                                global: false,
                            },
                        },
                    },
                ],
            },
        },
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-styled-components`,
        `gatsby-plugin-netlify`,
        /* Your site config here */
        ...calendarPlugins,
    ],
};
