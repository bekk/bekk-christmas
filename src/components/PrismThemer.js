import styled from 'styled-components';
import * as mediaQueries from '../constants/media-queries';

const PrismThemer = styled.div`
    /* Generated with http://k88hudson.github.io/syntax-highlighting-theme-generator/www */
    /* http://k88hudson.github.io/react-markdocs */
    /*********************************************************
    * General
    */
    --prism-text-color: #0e0e0e;
    --prism-background-color: #f6f8fa;
    --prism-comment-text-color: #6a737d;
    --prism-punctuation-color: #999999;
    --prism-property-color: #990055;
    --prism-selector-color: #669900;
    --prism-operator-color: #a67f59;
    --prism-keyword-color: #0077aa;
    --prism-function-color: #dd4a68;
    --prism-variable-color: #ee9900;

    ${mediaQueries.darkMode} {
        --prism--text-color: #c5c8c6;
        --prism--background-color: #1d1f21;
        --prism--comment-text-color: #7c7c7c;
        --prism--punctuation-color: #c5c8c6;
        --prism--property-color: #96cbfe;
        --prism--selector-color: #a8ff60;
        --prism--operator-color: #bccedd;
        --prism--keyword-color: #96cbfe;
        --prism--function-color: #dad085;
        --prism--variable-color: #c6c5fe;
    }

    pre[class*='language-'],
    code[class*='language-'] {
        color: var(--prism-text-color);
        font-size: 0.8em;
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
        padding: 16px;
        margin: 8px 0;
        overflow: auto;
        background: var(--prism-background-color);
    }
    :not(pre) > code[class*='language-'] {
        padding: 2px 5px;
        border-radius: 5px;
        color: var(--prism-text-color);
        background: var(--prism-background-color);
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
        color: var(--prism-comment-text-color);
    }
    .token.punctuation {
        color: var(--prism-punctuation-color);
    }
    .token.property,
    .token.tag,
    .token.boolean,
    .token.number,
    .token.constant,
    .token.symbol,
    .token.deleted {
        color: var(--prism-property-color);
    }
    .token.selector,
    .token.attr-name,
    .token.string,
    .token.char,
    .token.builtin,
    .token.inserted {
        color: var(--prism-selector-color);
    }
    .token.operator,
    .token.entity,
    .token.url,
    .language-css .token.string,
    .style .token.string {
        color: var(--prism-operator-color);
        background: transparent;
    }
    .token.atrule,
    .token.attr-value,
    .token.keyword {
        color: var(--prism-keyword-color);
    }
    .token.function {
        color: var(--prism-function-color);
        font-style: italic;
    }
    .token.regex,
    .token.important,
    .token.variable {
        color: var(--prism-variable-color);
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
        margin-top: 16px;
        background: #bccedd;
        box-shadow: inset 5px 0 0 #7e9cb9;
        z-index: 0;
        pointer-events: none;
        line-height: inherit;
        white-space: pre;
    }
`;

export default PrismThemer;
