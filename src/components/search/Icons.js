import React from 'react';
import styled from 'styled-components';

import * as mediaQueries from '../../constants/media-queries';

// Kopiert rett fra ansattlisten
const Cross = styled.svg`
    position: absolute;
    width: 16px;
    height: 16px;
    padding: 10px;
    top: 25px;
    right: 0;
    transform: translateY(-50%);
    stroke: var(--text-color);
    stroke-linecap: square;
    stroke-width: 1.6;
    box-sizing: content-box;
    cursor: pointer;

    ${mediaQueries.mediumUp}  {
        right: 15px;
        top: 71px;
    }
`;

export const CrossIcon = (args) => (
    <Cross xmlns="http://www.w3.org/2000/svg" {...args}>
        <path d="M14.74 1.26L1.22 14.78M1.26 1.26l13.52 13.52"></path>
    </Cross>
);

const Magnifier = styled.svg`
    position: absolute;
    width: 39px;
    height: 39px;
    top: 25px;
    right: 0;
    transform: translateY(-50%) scale(0.66667);

    path {
        fill: var(--text-color);
    }

    ${mediaQueries.mediumUp}  {
        top: 71px;
        transform: translateY(-50%);
    }
`;

export const MagnifierIcon = () => (
    <Magnifier xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(-6.000000, -5.000000)">
            <path
                d="M30.6656798,26.2390203 L50.8703704,26.2390203 L50.8703704,27.2609797 L30.6656798,27.2609797 C30.3951917,34.6181573 24.3076219,40.5 16.8375289,40.5 C9.19527273,40.5 3,34.3439153 3,26.75 C3,19.1560847 9.19527273,13 16.8375289,13 C24.3076219,13 30.3951917,18.8818427 30.6656798,26.2390203 Z M16.8375289,39.5244932 C23.937598,39.5244932 29.6933413,33.8051578 29.6933413,26.75 C29.6933413,19.6948422 23.937598,13.9755068 16.8375289,13.9755068 C9.73745983,13.9755068 3.98171658,19.6948422 3.98171658,26.75 C3.98171658,33.8051578 9.73745983,39.5244932 16.8375289,39.5244932 Z"
                transform="translate(26.935185, 26.750000) rotate(-315.000000) translate(-26.935185, -26.750000) "
            ></path>
        </g>
    </Magnifier>
);
