import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Calendar from '../components/Calendar';
import CalendarWindowOpen from '../components/CalendarWindowOpen';

import { getWindowImagePlaceholder } from '../utils';
import Preview from './Preview';

const Header = styled.h1`
    font-size: 2em;
    font-weight: 400;
`;

const Description = styled.div`
    margin-left: 50px;
    margin-bottom: 150px;
    max-width: 350px;
    font-size: 1.4em;
`;

const DailyWindowHeader = styled.h2`
    font-family: FFDINWebProLight, sans-serif;
    font-weight: 400;
    font-size: 1.8em;
`;

const Frontpage = ({ data, pageContext }) => {
    const calendars = data.allMarkdownRemark.nodes
        .filter(markdown => markdown.frontmatter.calendar != null)
        .map(markdown => markdown.frontmatter);

    const showTeaser = calendars.length === 0;

    return (
        <Layout>
            {showTeaser ? (
                <div />
            ) : (
                <>
                    <Description>
                        <Header>Bekk Christmas</Header>
                        <p>
                            288 articles, 24 days.
                            <br />
                            Made with 🎅 in Oslo, Norway!{' '}
                        </p>
                    </Description>
                    <DailyWindowHeader>Dagens luke</DailyWindowHeader>
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
                </>
            )}
            <Preview calendarsWithContent={pageContext.calendarsWithContent} />
        </Layout>
    );
};

export const frontpageQuery = graphql`
    query FrontPage($day: Int!, $year: Int!) {
        allMarkdownRemark(
            filter: { frontmatter: { post_day: { eq: $day }, post_year: { eq: $year } } }
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
