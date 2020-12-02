import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import Calendar from './Calendar';
import { mapCalendarToName } from '../utils';

const calendars = [
    'functional',
    'javascript',
    'kotlin',
    'innovation',
    'react',
    'security',
    'talks',
    'thecloud',
    'ux',
    'elm',
    'strategy',
];

const calendarsFromThePast = ['css', 'java', 'ml', 'opensource'];

const Container = styled.div``;

const Heading = styled.h2`
    padding: 10px;
    font-size: 2.2rem;
`;

const ListItem = styled.li`
    padding: 10px 15px;
    font-size: 1.5rem;
`;

const OtherCalendars = ({ calendarName }) => {
    const filteredCalendars = calendars.filter((calendar) => calendar !== calendarName);
    const filteredCalendarsFromThePast = calendarsFromThePast.filter(
        (calendar) => calendar !== calendarName
    );

    return (
        <Container>
            <Heading>
                <Link to="https://bekk.christmas">Bekk Christmas</Link>
            </Heading>
            <Calendar>
                {filteredCalendars.map((calendar) => (
                    <ListItem key={calendar}>
                        <Link href={`https://${calendar}.christmas`}>
                            {mapCalendarToName(calendar) + ' Christmas'}
                        </Link>
                    </ListItem>
                ))}
            </Calendar>
            <Heading>Visit the blogs of Christmas past</Heading>
            <Calendar>
                {filteredCalendarsFromThePast.map((calendar) => (
                    <ListItem key={calendar}>
                        <Link href={`https://${calendar}.christmas`}>
                            {mapCalendarToName(calendar) + ' Christmas'}
                        </Link>
                    </ListItem>
                ))}
            </Calendar>
        </Container>
    );
};

export default OtherCalendars;
