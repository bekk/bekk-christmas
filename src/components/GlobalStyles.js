import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';

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
    background: ${theme.primaryBackgroundColor};
    color: ${theme.textColor};
    transition: background-color 0.3s var(--easing), color 0.5s var(--easing);
    font-family: FFDINWebProLight, sans-serif;
    font-size: 1.125em;
    line-height: 1.4;
  }
  h1,
  h2,
  h3 {
    line-height: 1.15;
    font-family: NewZaldBook, sans-serif;
  }

  img {
    max-width: 100%;
  }
`
);

export default GlobalStyles;
