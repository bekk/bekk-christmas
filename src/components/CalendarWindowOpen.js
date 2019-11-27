import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import * as mediaQueries from '../constants/media-queries';
import { mapCalendarToName } from '../utils';

const CalendarWindowDescription = styled.p(
    ({ hasMargin }) => `
    text-decoration: underline;
    font-size: 1.5em;
    line-height: 140%;
    margin: ${hasMargin ? '0 0 15px' : '5px 0 0'};

    ${mediaQueries.mediumUp} {
        margin: ${hasMargin ? '0 0 20px' : '5px 0 0'};
    }
`
);

const CalendarName = styled.div`
    font-family: DINW01Regular, sans-serif;
    font-size: 1.875em;
    font-weight: 400;
    margin: 5px 0 10px;

    ${mediaQueries.mediumUp}  {
        margin: 10px 0 15px;
    }
`;
const WindowOpen = styled(Link)`
    text-decoration: none;
`;

const CalendarWindowOpen = ({ to, href, imageUrl, title, calendarName }) => {
    const windowContent = (
        <>
            <img src={imageUrl} alt="" />
            {calendarName && <CalendarName>{mapCalendarToName(calendarName)}</CalendarName>}
            <CalendarWindowDescription hasMargin={calendarName != null}>
                {title}
            </CalendarWindowDescription>
        </>
    );
    if (to) {
        return (
            <WindowOpen to={to} replace={false}>
                {windowContent}
            </WindowOpen>
        );
    }

    return (
        <WindowOpen as="a" href={href}>
            {windowContent}
        </WindowOpen>
    );
};

export default CalendarWindowOpen;
