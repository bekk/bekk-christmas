import { OutboundLink } from 'gatsby-plugin-google-analytics';
import React from 'react';
import styled from 'styled-components';
import * as mediaQueries from '../constants/media-queries';
import { mapCalendarToName } from '../utils';
import BekkLogo from './BekkLogo';

const Link = styled(OutboundLink)`
    color: inherit;
`;

const FlatList = styled.ul`
    margin: 0;
    padding: 0;
    list-style-type: none;
`;
const FlatListItem = styled.li`
    display: inline-flex;
    align-items: center;
    margin-right: 1em;

    &:last-of-type {
        margin-right: 0;
    }
`;

const Description = styled.p`
    max-width: 350px;
    margin: 0;
    ${mediaQueries.mediumUp} {
        margin-top: 48px;
    }
`;

const Container = styled.footer`
    max-width: 1600px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: start;

    ${mediaQueries.mediumUp} {
        align-items: end;
        flex-direction: row;
        padding: 30px;
    }
`;

const Column = styled.div`
    margin-bottom: 50px;
`;

const calendars = [
    'css',
    'dot-net',
    'functional',
    'java',
    'javascript',
    'kotlin',
    'ml',
    'opensource',
    'product',
    'react',
    'security',
    'talks',
    'thecloud',
    'ux',
];

const SiteFooter = ({ calendarName }) => {
    const otherCalendars = calendars.filter((calendar) => calendar !== calendarName);

    return (
        <Container>
            <Column>
                <h2 style={{ marginTop: 0 }}>
                    <a href="https://bekk.christmas">Bekk Christmas</a>
                </h2>
                <FlatList>
                    {otherCalendars.map((calendar) => (
                        <li key={calendar}>
                            <Link href={`https://${calendar}.christmas`}>
                                {mapCalendarToName(calendar) + ' Christmas'}
                            </Link>
                        </li>
                    ))}
                </FlatList>
            </Column>
            <Column>
                <Description>
                    Bekk is all about craftmanship and the people crafting it. This year, we're
                    creating 11 advent calendars, each with daily original content made by us.
                </Description>
            </Column>
            <Column>
                <BekkLogo />
                <FlatList style={{ marginTop: 20 }}>
                    <FlatListItem>
                        <Link href="https://www.instagram.com/livetibekk/">Instagram</Link>
                    </FlatListItem>
                    <FlatListItem>
                        <Link href="https://www.facebook.com/livetibekk/">Facebook</Link>
                    </FlatListItem>
                    <FlatListItem>
                        <Link href="https://blogg.bekk.no/">Blog</Link>
                    </FlatListItem>
                </FlatList>
            </Column>
        </Container>
    );
};

export default SiteFooter;
