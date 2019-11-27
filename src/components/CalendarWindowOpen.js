import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import CalendarWindowWrapper from './CalendarWindowWrapper';

const WindowOpen = styled(Link)`
    text-decoration: none;
`;

const CalendarWindowOpen = ({ isPreview, link, imageUrl, title }) => {
    if (isPreview) {
        return (
            <WindowOpen to={link} replace={false}>
                <img src={imageUrl} alt="" />
                {title}
            </WindowOpen>
        );
    }

    return (
        <CalendarWindowWrapper>
            <WindowOpen as="a" href={link}>
                <img src={imageUrl} alt="" />
                {title}
            </WindowOpen>
        </CalendarWindowWrapper>
    );
};

export default CalendarWindowOpen;
