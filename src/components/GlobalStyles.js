import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';

import * as mediaQueries from '../constants/media-queries';

import '@bekk/storybook/build/lib/constants/styles.css';
import '@bekk/storybook/build/lib/fonts/webfonts.css';

const GlobalStyles = createGlobalStyle`
  ${normalize}

  &:root {
    --primary-background-color: #fff;
    --secondary-background-color: #f0f0f0;
    --contrast-background-color: var(--gul-kontrast);
    --text-color: #0e0e0e;
    --link-text-color: #0e0e0e;
    --contrast-text-color: #0e0e0e;
    --dark-theme-image-display: none;
    --light-theme-image-display: block;
    
    ${mediaQueries.darkMode} {
      --primary-background-color: #0e0e0e;
      --secondary-background-color: #222;
      --contrast-background-color: var(--gul-kontrast);
      --text-color: #fff;
      --link-text-color: #fff;
      --contrast-text-color: #fff;
      --dark-theme-image-display: block;
      --light-theme-image-display: none;
    }
  }

  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    background: var(--primary-background-color);
    color: var(--text-color);
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
      color: var(--link-text-color);
    }
  }
`;

export default GlobalStyles;
