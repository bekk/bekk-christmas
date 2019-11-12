import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const WindowOpen = styled(Link)`
    text-decoration: none;
    color: black;

    &:active,
    &:visited {
        color: black;
    }
`;
const Title = styled.span`
    text-decoration: underline;
`;

const CalendarWindowOpen = ({ link, imageUrl, title }) => {
    return (
        <WindowOpen to={link} replace={false}>
            <img src={imageUrl}></img>
            <Title>{title}</Title>
        </WindowOpen>
    );
};

export default CalendarWindowOpen;
