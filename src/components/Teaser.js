import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Helmet } from 'react-helmet';
import GlobalStyles from './GlobalStyles';
import * as mediaQueries from '../constants/media-queries';
import teaser1Src from '../images/teaser-1.jpg';
import teaser2Src from '../images/teaser-2.jpg';
import teaser3Src from '../images/teaser-3.jpg';

const Container = styled.main`
    margin: 64px auto;
    max-width: 1200px;
    padding: 0 16px;

    ${mediaQueries.mediumUp} {
        margin: 180px auto;
    }
`;
const Heading = styled.h1`
    font-weight: normal;
    font-size: 5.625em;
`;

const ImagePotpourri = styled.section`
    position: relative;
    min-height: 500px;
`;
const Image = styled.img(
    ({ index }) => `
    width: 100%;
    position: relative;

    ${
        index === 2
            ? `
      left: -16px;
      top: -50px;
  `
            : ''
    }

  ${
      index === 3
          ? `
      right: -16px;
      top: -200px;
  `
          : ''
  }

  ${mediaQueries.mediumUp} {
        width: 500px;
        height: 500px;
        position: absolute;

        ${
            index === 1
                ? `
            top: 140px;
            left: 66px;
            z-index: 2;
        `
                : ''
        }

        ${
            index === 2
                ? `
            top: 250px;
            left: unset;
            right: 250px;
        `
                : ''
        }

        ${
            index === 3
                ? `
            right: 0;
            top: unset;
            z-index: 2;
        `
                : ''
        }
    }
`
);
const Paragraph = styled.p`
    font-size: 2.8em;
    font-weight: 300;
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
  ${from === 'right' &&
        `transform: translateX(100%);`}
  ${from === 'bottom' &&
        `transform: translateY(100%);`}
  ${fade && 'opacity: 0;'}
    `
);

export const Teaser = () => {
    return (
        <div>
            <GlobalStyles />
            <Helmet>
                <title>Introducing a Bekk Christmas..</title>
                <meta
                    property="description"
                    content="We're creating lots calendars, each with daily content, articles and podcasts."
                />
            </Helmet>
            <Container>
                <SpectacularEntrance fade>
                    <Heading>Lots of calendars. 24 days. Tons of articles.</Heading>
                </SpectacularEntrance>
                <SpectacularEntrance fade delay="0.5s">
                    <Paragraph>
                        Bekk is all about craftmanship and the people crafting it. This year, we're
                        creating lots of calendars, each with daily content, articles and podcasts.
                    </Paragraph>
                </SpectacularEntrance>
                <SpectacularEntrance fade delay="2s">
                    <Paragraph>The fun starts on December 1st.</Paragraph>
                </SpectacularEntrance>
                <ImagePotpourri>
                    <SpectacularEntrance
                        src={teaser1Src}
                        alt=""
                        index={1}
                        as={Image}
                        from="bottom"
                        fade
                        delay="1.5s"
                    />

                    <SpectacularEntrance
                        src={teaser2Src}
                        alt=""
                        index={2}
                        as={Image}
                        from="bottom"
                        fade
                        delay="1.2s"
                    />
                    <SpectacularEntrance
                        src={teaser3Src}
                        alt=""
                        index={3}
                        as={Image}
                        from="bottom"
                        fade
                        delay="1.7s"
                    />
                </ImagePotpourri>
            </Container>
        </div>
    );
};
