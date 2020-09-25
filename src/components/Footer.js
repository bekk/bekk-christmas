import React from 'react';
import styled from 'styled-components';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import BekkLogo from './BekkLogo';
import * as mediaQueries from '../constants/media-queries';

const Container = styled.footer`
    max-width: 1600px;
    margin: 75px auto 50px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    ${mediaQueries.mediumUp} {
        padding: 30px;
    }
`;

const Description = styled.p`
    text-align: center;
    max-width: 400px;
    margin: 20px 0;
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

const SiteFooter = () => (
    <Container>
        <BekkLogo />
        <Description>
            Bekk is all about craftmanship and the people crafting it. This year, we're creating 11
            advent calendars, each with daily original content made by us.
        </Description>
        <FlatList>
            <FlatListItem>
                <OutboundLink href="https://www.instagram.com/livetibekk/">Instagram</OutboundLink>
            </FlatListItem>
            <FlatListItem>
                <OutboundLink href="https://www.facebook.com/livetibekk/">Facebook</OutboundLink>
            </FlatListItem>
            <FlatListItem>
                <OutboundLink href="https://blogg.bekk.no/">Blog</OutboundLink>
            </FlatListItem>
        </FlatList>
    </Container>
);

export default SiteFooter;
