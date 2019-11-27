import styled from 'styled-components';
import * as fonts from '../constants/fonts';

const ArticleBody = styled.article(
    ({ theme }) => `
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    pre {
        color: ${theme.textColor};
        margin: 1em auto 0.5em;
        word-wrap: break-word;
        max-width: 760px;
    }
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: ${fonts.sansSerifFont};
        font-weight: 300;
    }
    h2 {
        font-size: 2.2em;
    }
    h3,
    h4,
    h5,
    h6 {
        font-size: 1.5em;
    }
    p {
        font-family: FFDINWebProLight, sans-serif;
        font-size: 1.25em;
        line-height: 1.45;
    }
    p code {
        background-color: ${theme.secondaryBackgroundColor};
        padding: 3px 4px;
        margin: 0 2px;
        font-size: inherit;
    }
    p img {
        width: 100%;
    }
    pre {
        background-color: ${theme.secondaryBackgroundColor};
        padding: 16px;
        overflow-y: scroll;
    }
    pre code {
        background: transparent;
        line-height: 1.5;
    }
    a {
        color: ${theme.linkTextColor};
    }
    ul,
    ol {
        padding-left: 16px;
        li {
            margin-bottom: 8px;
        }
    }
    .gatsby-highlight, iframe {
        margin: 50px auto;
    }
    h1,
    table,
    div,
    ul,
    ol {
        max-width:760px;
        margin-left:auto;
        margin-right:auto;
    }
    video {
        display: block;
        width: 100%;
        max-width: 760px;
        margin: 50px auto;
    }
    `
);

export default ArticleBody;
