import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const WindowOpen = styled(Link)(
    ({ theme }) => `
    text-decoration: none;

    &,
    &:active,
    &:visited {
        color: ${theme.textColor};
    }
`
);
const Title = styled.span`
    text-decoration: underline;
`;

const CalendarWindowOpen = ({ link, imageUrl, title }) => {
    return (
        <WindowOpen to={link} replace={false}>
            <img src={imageUrl} alt="" />
            <Title>{title}</Title>
        </WindowOpen>
    );
};

export default CalendarWindowOpen;
