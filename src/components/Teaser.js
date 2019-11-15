import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { ThemeProvider } from './ThemeContext';
import GlobalStyles from './GlobalStyles';
import teaser1Src from '../images/teaser-1.jpg';
import teaser2Src from '../images/teaser-2.jpg';
import teaser3Src from '../images/teaser-3.jpg';

const Container = styled.main`
    margin: 64px auto;
    max-width: 1200px;
    padding: 0 1em;

    @media screen and (min-width: 800px) {
        margin: 180px auto;
    }
`;
const Heading = styled.h1`
    font-family: NewzaldBook, serif;
    font-size: 60px;
    font-weight: normal;

    @media screen and (min-width: 800px) {
        font-size: 90px;
    }
`;
const ImagePotpourri = styled.section`
    position: relative;
    min-height: 500px;
`;
const Image = styled.img`
    width: 100%;
    margin-bottom: 1em;
    @media screen and (min-width: 800px) {
        width: 500px;
        height: 500px;
        position: absolute;
    }
`;
const Paragraph = styled.p`
    font-size: 26px;
    font-weight: 300;

    @media screen and (min-width: 800px) {
        font-size: 45px;
    }
`;

const slideFade = keyframes`
to {
  opacity: 1;
  transform: none;
}
`;
const SpectacularEntrance = styled.div(
    ({ speed = '1s', delay = '', from, fade = false }) => css`
  animation: ${speed} ${delay} ease-out forwards ${slideFade};

  ${from === 'left' && `transform: translateX(-100%);`}
  ${from === 'top' && `transform: translateY(-100%);`}
  ${from === 'right' && `transform: translateX(100%);`}
  ${from === 'bottom' && `transform: translateY(100%);`}
  ${fade && 'opacity: 0;'}
`
);

export const Teaser = () => {
    return (
        <ThemeProvider>
            <GlobalStyles />
            <Container>
                <SpectacularEntrance fade>
                    <Heading>12 calendars. 24 days. 288 articles.</Heading>
                </SpectacularEntrance>
                <SpectacularEntrance fade delay="0.5s">
                    <Paragraph>
                        Bekk is all about craftmanship and the people crafting it. This year, we're
                        creating 12 calendars, each with daily content, articles and podcasts.
                    </Paragraph>
                </SpectacularEntrance>
                <SpectacularEntrance fade delay="2s">
                    <Paragraph>The fun starts on December 1st.</Paragraph>
                </SpectacularEntrance>
                <SpectacularEntrance from="bottom">
                    <ImagePotpourri>
                        <Image
                            src={teaser1Src}
                            alt=""
                            style={{ zIndex: 2, top: '140px', left: '66px' }}
                        />
                        <Image src={teaser2Src} alt="" style={{ top: '250px', right: '250px' }} />
                        <Image src={teaser3Src} alt="" style={{ zIndex: 2, right: 0 }} />
                    </ImagePotpourri>
                </SpectacularEntrance>
            </Container>
        </ThemeProvider>
    );
};
