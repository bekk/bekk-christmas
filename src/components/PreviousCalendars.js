import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'gatsby';
import { mapCalendarToName } from '../utils';

const CalendarList = styled.ul`
    font-family: DINW01Regular, sans-serif;
    font-size: 1.875em;
    list-style: none;
    padding: 0 15px;
`;

const CalendarListItem = styled.li`
    display: flex;
    margin-top: 20px;
    span {
        display: flex;
        flex-wrap: wrap;
    }
`;

const CalendarLink = styled(Link)`
    margin-left: 20px;
    transition: color 0.2s;
    line-height: 1.5;

    &:hover {
        color: var(--solnedgang-kontrast);
    }
`;

const PreviousCalendars = ({ calendarsWithContent }) => {
    if (calendarsWithContent == null || calendarsWithContent.length === 0) {
        return null;
    }

    const calendarsWithInfo = calendarsWithContent.map((link) => {
        const [, name, year] = link.split('/');
        return { link, name, year };
    });

    const thisYear = new Date().getFullYear();
    const filteredCalendars = calendarsWithInfo.filter((cal) => cal.year != thisYear);

    const groupedCalendars = filteredCalendars.reduce((yearCollection, cal) => {
        const key = cal.year;
        if (!yearCollection.hasOwnProperty(key)) {
            yearCollection[key] = [];
        }
        yearCollection[key].push(cal);
        return yearCollection;
    }, {});

    const sortedCalendarsByYear = Object.entries(groupedCalendars).reverse();

    return (
        <CalendarList>
            {sortedCalendarsByYear.map(([year, calendars]) => (
                <CalendarListItem key={year}>
                    <strong>{year}:</strong>
                    <span>
                        {calendars.map(({ link, name }) => (
                            <CalendarLink to={link} key={link}>
                                {mapCalendarToName(name)}
                            </CalendarLink>
                        ))}
                    </span>
                </CalendarListItem>
            ))}
        </CalendarList>
    );
};

export default PreviousCalendars;
