import React from 'react';
import styled from 'styled-components';

const Container = styled.div(
    ({ theme }) => `
  background: ${theme.contrastBackgroundColor};
  border-bottom: 2px solid ${theme.textColor};
  color: ${theme.contrastTextColor};
  text-align: center;
  padding: 1em;
  margin: 0 auto;
  transform: translateY(-100%);
  transition: transform .1s ease-out;
  position: absolute;
  top: 0;
  width: 100%;

  &:focus-within {
    transform: none;
  }
`
);

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

export const MainContentWrapper = props => {
    return <main id="main-content">{props.children}</main>;
};
