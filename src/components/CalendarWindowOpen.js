import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const WindowOpen = styled(Link)`
    text-decoration: none;
`;

const CalendarWindowOpen = ({ link, imageUrl, title }) => {
    return (
        <WindowOpen to={link} replace={false}>
            <img src={imageUrl} alt="" />
            {title}
        </WindowOpen>
    );
};

export default CalendarWindowOpen;
