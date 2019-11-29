import React from 'react';
import styled from 'styled-components';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import BekkLogo from './BekkLogo';
import * as mediaQueries from '../constants/media-queries';

import { mapCalendarToName } from '../utils';

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

const RightFooterLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    ${mediaQueries.mediumUp} {
        align-items: flex-end;
    }
`;

const Description = styled.p`
    max-width: 350px;
    text-align: left;

    ${mediaQueries.mediumUp} {
        text-align: right;
    }
`;

const Container = styled.footer`
    max-width: 1600px;
    margin: 0 auto;
    padding: 20px;

    ${mediaQueries.mediumUp}  {
        padding: 30px;
    }

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;

    ${mediaQueries.mediumUp} {
        flex-direction: row;
    }
`;

const Column = styled.div`
    margin-bottom: 50px;
`;

const calendars = [
    'css',
    'functional',
    'java',
    'javascript',
    'kotlin',
    'ml',
    'opensource',
    'product',
    'react',
    'security',
    'thecloud',
    'ux',
];

const SiteFooter = ({ calendarName }) => {
    const otherCalendars = calendars.filter(calendar => calendar !== calendarName);

    return (
        <Container>
            <Column>
                <p>Check out some of our other calendars:</p>
                <FlatList>
                    {otherCalendars.map(calendar => (
                        <li key={calendar}>
                            <Link href={`https://${calendar}.christmas`}>
                                {mapCalendarToName(calendar) + ' Christmas'}
                            </Link>
                        </li>
                    ))}
                </FlatList>
            </Column>
            <Column>
                <RightFooterLayout>
                    <BekkLogo />
                    <Description>
                        Bekk is all about craftmanship and the people crafting it. This year, we're
                        creating 12 calendars, each with daily content, articles and podcasts.
                    </Description>
                    <FlatList>
                        <FlatListItem>
                            <Link href="https://www.instagram.com/livetibekk/">Instagram</Link>
                        </FlatListItem>
                        <FlatListItem>
                            <Link href="https://www.facebook.com/BekkConsulting/">Facebook</Link>
                        </FlatListItem>
                        <FlatListItem>
                            <Link href="https://blogg.bekk.no/">Blogg</Link>
                        </FlatListItem>
                    </FlatList>
                </RightFooterLayout>
            </Column>
        </Container>
    );
};

export default SiteFooter;
