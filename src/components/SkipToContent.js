import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    background: var(--contrast-background-color);
    border-bottom: 2px solid var(--text-color);
    color: var(--contrast-text-color);
    text-align: center;
    padding: 16px;
    margin: 0 auto;
    transform: translateY(-100%);
    transition: transform 0.1s ease-out;
    position: absolute;
    top: 0;
    width: 100%;

    &:focus-within {
        transform: none;
    }
`;

const LinkText = styled.a`
    &,
    &:visited,
    &:active {
        color: inherit;
    }

    &:focus {
        outline: none;
    }
`;

export const SkipToContent = () => (
    <Container>
        <LinkText href="#main-content">Skip to content</LinkText>
    </Container>
);

export const MainContentWrapper = ({ children, ...rest }) => {
    return (
        <main id="main-content" {...rest}>
            {children}
        </main>
    );
};
