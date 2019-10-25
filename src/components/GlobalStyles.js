import normalize from 'styled-normalize';
import * as fonts from '../constants/fonts';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    ${normalize}
    html {
        box-sizing: border-box;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    html, body {
        margin: 0; padding: 0;
    }
    img {
        max-width: 100%;
    }

    body {
        font-family: ${fonts.serifFont};
    }
`;

export default GlobalStyles;
