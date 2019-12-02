import styled from 'styled-components';

const ArticleBody = styled.article`
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    pre {
        color: var(--text-color);
        margin: 1em auto 0.5em;
        word-wrap: break-word;
        max-width: 760px;
    }
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-weight: 300;
    }
    h2 {
        font-size: 2.2rem;
    }
    h3,
    h4,
    h5,
    h6 {
        font-size: 1.5rem;
    }
    p,
    li {
        font-family: FFDINWebProLight, sans-serif;
        font-size: 1.25rem;
        line-height: 1.45;
    }
    p code,
    li code {
        background-color: var(--secondary-background-color);
        padding: 3px 4px;
        margin: 0 2px;
        font-size: inherit;
        white-space: normal;
        word-break: normal;
    }
    p img {
        width: 100%;
    }
    pre {
        background-color: var(--secondary-background-color);
        padding: 16px;
        overflow-y: scroll;
    }
    pre code {
        background: transparent;
        line-height: 1.5;
    }
    a {
        color: var(--link-text-color);
    }
    ul,
    ol {
        padding-left: 16px;
        li  {
            margin-bottom: 8px;
        }
    }
    .gatsby-highlight,
    iframe {
        margin: 50px auto;
    }
    h1,
    table,
    div,
    ul,
    blockquote,
    ol {
        max-width: 760px;
        margin-left: auto;
        margin-right: auto;
    }
    blockquote {
        padding-left: 35px;
    }
    video {
        display: block;
        width: 100%;
        max-width: 760px;
        margin: 50px auto;
    }
    .gatsby-highlight {
        font-size: 1.25rem;
    }
`;

export default ArticleBody;
