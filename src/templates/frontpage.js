import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Calendar from '../components/Calendar';
import CalendarWindowOpen from '../components/CalendarWindowOpen';

import { getWindowImagePlaceholder } from '../utils';
import Preview from './Preview';
import { Teaser } from '../components/Teaser';

const Header = styled.h1`
    font-size: 2em;
    font-weight: 400;
`;

const Description = styled.div`
    margin-left: 50px;
    margin-bottom: 150px;
    max-width: 350px;
    font-size: 22px;
`;

const DailyWindowHeader = styled.h2`
    font-family: FFDINWebProLight, sans-serif;
    font-weight: 400;
    font-size: 1.8em;
`;

const Frontpage = ({ data, pageContext }) => {
    const calendars = data.allMarkdownRemark.nodes.map(markdown => markdown.frontmatter);

    const showTeaser = calendars.length === 0;

    if (showTeaser) {
        return (
            <>
                <Teaser />
                <Preview calendarsWithContent={pageContext.calendarsWithContent} />
            </>
        );
    }

    return (
        <Layout>
            <Description>
                <Header>Bekk Christmas</Header>
                <p>
                    288 articles, 24 days.
                    <br />
                    Made with{' '}
                    <span role="img" aria-label="christmas spirit">
                        🎅
                    </span>{' '}
                    in Oslo and Trondheim, Norway!
                </p>
            </Description>
            <DailyWindowHeader>Dagens luker</DailyWindowHeader>
            <Calendar>
                {calendars.map((calendar, index) => (
                    <li key={calendar.calendar}>
                        <CalendarWindowOpen
                            link={`${calendar.calendar}/${calendar.post_year}/${calendar.post_day}`}
                            imageUrl={getWindowImagePlaceholder(index)}
                            title={calendar.calendar}
                        />
                    </li>
                ))}
            </Calendar>
            <Preview calendarsWithContent={pageContext.calendarsWithContent} />
        </Layout>
    );
};

export const frontpageQuery = graphql`
    query FrontPage($day: Int!, $year: Int!) {
        allMarkdownRemark(
            filter: {
                frontmatter: {
                    post_day: { eq: $day }
                    post_year: { eq: $year }
                    calendar: { ne: null }
                }
            }
        ) {
            nodes {
                frontmatter {
                    calendar
                    post_year
                    post_day
                    title
                }
            }
        }
    }
`;

export default Frontpage;
