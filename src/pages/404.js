import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import * as mediaQueries from '../constants/media-queries';
import { BrokenBalls } from '../components/BrokenBalls';

const OuterContainer = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 100vh;
`;

const Heading = styled.h1`
    font-size: 3rem;
    margin: 0;

    ${mediaQueries.mediumUp} {
        font-size: 5.624rem;
    }
`;

const StyledBalls = styled(BrokenBalls)`
    width: 80%;
    max-width: 380px;
`;

const LinkText = styled(Link)`
    color: inherit;
    text-decoration: underline;
`;

const Paragraph = styled.p`
    font-family: FFDINWebProLight, sans-serif;
    font-size: 1.25rem;
    line-height: 1.45;
`;

const PageNotFoundPage = () => (
    <OuterContainer>
        <div>
            <Heading>404</Heading>
            <StyledBalls />
            <Heading as="h2">Oh balls...</Heading>
            <Paragraph>
                Page not found, return <LinkText to="/">here</LinkText>
            </Paragraph>
        </div>
    </OuterContainer>
);

export default PageNotFoundPage;
