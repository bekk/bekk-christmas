import styled from 'styled-components';
import * as fonts from '../constants/fonts';
import * as mq from '../constants/media-queries';

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
        font-size: 34px;

        ${mq.mediumUp} {
            font-size: 42px;
        }
    }
    h3,
    h4,
    h5,
    h6 {
        font-size: 24px;
        ${mq.mediumUp} {
            font-size: 34px;
        }
    }
    p {
        font-family: FFDINWebProLight, sans-serif;
        font-size: 20px;
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
        padding: 1em;
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
        padding-left: 1em ;
        li {
            margin-bottom: .5em;
        }
    }
    .gatsby-highlight, iframe {
        margin: 50px auto;
    }
    .p-with-img {
        max-width: 1260px;
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
        margin-left: auto;
        margin-right: auto;
    }
    `
);

export default ArticleBody;
