import React from 'react';
import styled, { keyframes } from 'styled-components';
import * as mediaQueries from '../constants/media-queries';

const fade = keyframes`
  to {
    fill: inherit;
  }
`;

const Container = styled.div`
    fill: ${({ theme }) => theme.textColor};
    width: 200px;
    ${mediaQueries.mediumUp} {
        margin-top: 50px;
    }

    cursor: pointer;

    &:focus,
    &:hover {
        path {
            fill: ${({ theme }) => theme.secondaryBackgroundColor};
            animation-duration: 0.15s;
            animation-name: ${fade};
            animation-timing-function: ease-in-out;
            animation-fill-mode: forwards;
            transition-duration: 0.3s;
        }
        #last-k-bottom,
        #e-top {
            animation-delay: 0.3s;
        }
        #b-bottom,
        #last-k-top {
            animation-delay: 0.4s;
        }
        #e-bottom,
        #first-k-bottom {
            animation-delay: 0.5s;
        }
        #first-k-top,
        #b-top {
            animation-delay: 0.6s;
        }
    }
`;

const BekkLogo = props => {
    return (
        <Container {...props}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398.51 93.42" role="presentation">
                <title>Bekk</title>
                <path
                    id="b-top"
                    d="M.19.07H35S63.78-2.36,63.78,21.83,39,44.2,34.28,44.2L0,44.15V33.45H35.57s15.62.72,15.62-11.62c0-11.92-10.56-11.08-16-11.08H.18Z"
                />
                <path
                    id="b-bottom"
                    d="M59.09,52.18c5.3,3.17,10.06,8.89,10.06,18.24,0,24.19-24.79,22.82-29.52,22.82L0,93.27V82.55H40.67s15.79.21,15.9-12.13c.07-8.48-5.32-14.93-10.47-18.24Z"
                />
                <path
                    id="e-bottom"
                    d="M100.18,52.18h14.9V73.33c0,6.94,4.17,9.22,8.29,9.22H164.1l.06,10.87H115c-5.11,0-14.84-3.31-14.84-17.11Z"
                />
                <path
                    id="e-top"
                    d="M164.21,33.51l-42.14,0c-4.13,0-7-.4-7-5.13,0-.74,0-11.51.07-12.33,0-5,2.56-5.28,6.69-5.28h42.33V.07h-48S100.18-1,100.18,16V27.88c0,15.27,11.4,16.27,16.51,16.27h47.42Z"
                />
                <path
                    id="first-k-top"
                    d="M270.79.09c-2.24,2.47-23.06,27.36-25.7,30-4.4,4.34-12.28,3.41-18.66,3.41s-7.59-4.91-7.59-8.25,0-22.12,0-25.13H204c0,3.18.05,29.25.05,33.38,0,3.28,1.54,10.72,14.74,10.72l25.44,0c3.27,0,8.2-2,13.85-8.68,1.67-2,25.85-31.06,29.77-35.38Z"
                />
                <path
                    id="first-k-bottom"
                    d="M256.2,58.87c-3.11-3.36-5.95-6.69-15.74-6.69H218.78c-10.85,0-14.71,7.87-14.71,12v29.1l14.77,0c0-3,0-21.72,0-25.06s1-5.22,7.46-5.22,5.39,0,6.11,0c6.11,0,9.53.22,12.68,3.36,2.63,2.62,24.26,24.28,26.75,26.89h17C284.7,88.77,258,60.77,256.2,58.87Z"
                />
                <path
                    id="last-k-top"
                    d="M380.43.12c-2.24,2.47-23.06,27.36-25.7,30-4.4,4.34-12.28,3.41-18.66,3.41s-7.59-4.91-7.59-8.25,0-22.12,0-25.13H313.62c0,3.18.05,29.25.05,33.38,0,3.28,1.54,10.72,14.74,10.72l25.44,0c3.27,0,8.2-2,13.85-8.68,1.67-2,25.85-31.06,29.77-35.38Z"
                />
                <path
                    id="last-k-bottom"
                    d="M365.84,58.9c-3.11-3.36-5.95-6.69-15.74-6.69H328.41c-10.85,0-14.71,7.87-14.71,12v29.1l14.77,0c0-3,0-21.72,0-25.06S329.48,63,336,63s5.39,0,6.11,0c6.11,0,9.53.22,12.68,3.36C357.39,69,379,90.65,381.51,93.27h17C394.34,88.81,367.6,60.8,365.84,58.9Z"
                />
            </svg>
        </Container>
    );
};

export default BekkLogo;
