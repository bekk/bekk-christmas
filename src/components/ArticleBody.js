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
        margin: 1em auto 0.5em auto;
        word-wrap: break-word;
        max-width:759px;
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
        font-size: 42px;
    }
    h3,
    h4,
    h5,
    h6 {
        font-size: 34px;
    }
    p code {
        background-color: ${theme.secondaryBackgroundColor};
        padding: 3px 4px;
        margin: 0 2px;
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
        font-size: 21px;
        line-height: 1.58;
    }
    .gatsby-highlight, iframe{
        margin:50px auto;
    }
    .p-with-img{
        max-width: 1258px;
    }
    h1,
    table,
    div,
    ul,
    ol {
        max-width:759px;
        margin-left:auto;
        margin-right:auto;
    }
    video {
        display: block;
        width: 100%;
        max-width: 759px;
        margin-left: auto;
        margin-right: auto;
    }
    `
);

export default ArticleBody;
