import React from 'react';
import styled from 'styled-components';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import BekkLogo from './BekkLogo';
import * as mediaQueries from '../constants/media-queries';

import { Grid, GridContent } from './Grid';
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

const SiteFooter = () => {
    return (
        <Grid style={{ marginTop: '200px', marginBottom: '50px' }}>
            <GridContent md="2 / 6" style={{ fontStyle: 'normal' }}>
                <p>Check out some of our other calendars</p>
                <FlatList>
                    {calendars.map(calendar => (
                        <li key={calendar}>
                            <Link href={`https://${calendar}.christmas`}>
                                {mapCalendarToName(calendar) + ' Christmas'}
                            </Link>
                        </li>
                    ))}
                </FlatList>
            </GridContent>
            <GridContent md="7 / 12" align="start" alignMd="end">
                <RightFooterLayout>
                    <BekkLogo style={{ width: '5em', cursor: 'pointer' }} />
                    <Description>
                        Bekk is all about craftmanship and the people crafting it. This year, we're
                        creating 12 calendars, each with daily content, articles and podcasts.
                    </Description>
                    <FlatList style={{ margin: '0.8em 0 2em' }}>
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
            </GridContent>
        </Grid>
    );
};

export default SiteFooter;
