import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';

import * as mediaQueries from '../constants/media-queries';

import '@bekk/storybook/build/lib/constants/styles.css';
import '@bekk/storybook/build/lib/fonts/webfonts.css';

const GlobalStyles = createGlobalStyle(
    ({ theme }) => `
  ${normalize}

  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    color: ${theme.textColor};
    transition: background-color 0.3s var(--easing), color 0.5s var(--easing);
    font-family: FFDINWebProLight, sans-serif;
    font-size: 14px;
    line-height: 1.4;

    ${mediaQueries.mediumUp}  {
      font-size: 16px;
    }
  }
  
  h1,
  h2,
  h3 {
    line-height: 1.15;
    font-family: NewZaldBook, serif;
  }

  img {
    max-width: 100%;
  }

  a {
    &,
    &:visited,
    &:active {
      color: ${theme.textColor}
    }
  }
`
);

export default GlobalStyles;
