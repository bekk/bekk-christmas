import styled from 'styled-components';

const PrismThemer = styled.div(
    ({ theme }) => `
    /* Generated with http://k88hudson.github.io/syntax-highlighting-theme-generator/www */
    /* http://k88hudson.github.io/react-markdocs */
    /*********************************************************
    * General
    */
    pre[class*='language-'],
    code[class*='language-'] {
        color: ${theme.prism.textColor};
        font-size: 13px;
        text-shadow: none;
        font-family: 'Dank Mono', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
        direction: ltr;
        text-align: left;
        white-space: pre;
        word-spacing: normal;
        word-break: normal;
        line-height: 1.5;
        tab-size: 4;
        hyphens: none;
    }
    @media print {
        pre[class*='language-'],
        code[class*='language-'] {
            text-shadow: none;
        }
    }
    pre[class*='language-'] {
        padding: 1em;
        margin: 0.5em 0;
        overflow: auto;
        background: ${theme.prism.backgroundColor};
    }
    :not(pre) > code[class*='language-'] {
        padding: 0.1em 0.3em;
        border-radius: 0.3em;
        color: ${theme.prism.textColor};
        background: ${theme.prism.backgroundColor};
    }
    /*********************************************************
    * Tokens
    */
    .namespace {
        opacity: 0.7;
    }
    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
        color: ${theme.prism.commentTextColor};
    }
    .token.punctuation {
        color: ${theme.prism.punctuationColor};
    }
    .token.property,
    .token.tag,
    .token.boolean,
    .token.number,
    .token.constant,
    .token.symbol,
    .token.deleted {
        color: ${theme.prism.propertyColor};
    }
    .token.selector,
    .token.attr-name,
    .token.string,
    .token.char,
    .token.builtin,
    .token.inserted {
        color: ${theme.prism.selectorColor};
    }
    .token.operator,
    .token.entity,
    .token.url,
    .language-css .token.string,
    .style .token.string {
        color: ${theme.prism.operatorColor};
        background: transparent;
    }
    .token.atrule,
    .token.attr-value,
    .token.keyword {
        color: ${theme.prism.keywordColor};
    }
    .token.function {
        color: ${theme.prism.functionColor};
        font-style: italic;
    }
    .token.regex,
    .token.important,
    .token.variable {
        color: ${theme.prism.variableColor};
    }
    .token.important,
    .token.bold {
        font-weight: bold;
    }
    .token.italic {
        font-style: italic;
    }
    .token.entity {
        cursor: help;
    }
    /*********************************************************
    * Line highlighting
    */
    pre[data-line] {
        position: relative;
    }
    pre[class*='language-'] > code[class*='language-'] {
        position: relative;
        z-index: 1;
    }
    .line-highlight {
        position: absolute;
        left: 0;
        right: 0;
        padding: inherit 0;
        margin-top: 1em;
        background: #bccedd;
        box-shadow: inset 5px 0 0 #7e9cb9;
        z-index: 0;
        pointer-events: none;
        line-height: inherit;
        white-space: pre;
    }
`
);

export default PrismThemer;
