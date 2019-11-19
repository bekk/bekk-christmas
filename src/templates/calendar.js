import React from 'react';
import { graphql } from 'gatsby';

import Calendar from '../components/Calendar';
import CalendarWindowClosed from '../components/CalendarWindowClosed';
import CalendarWindowOpen from '../components/CalendarWindowOpen';
import Layout from '../components/Layout';

import { getWindowImagePlaceholder } from '../utils';
import { Teaser } from '../components/Teaser';

const createLink = (includeCalendarInPath, calendar, year, day) => {
    let link = '';

    if (includeCalendarInPath) {
        link += `/${calendar}`;
    }

    if (!day) {
        return year === 2019 ? link : `${link}/${year}`;
    }

    return `${link}/${year}/${day}`;
};

const Template = ({ data, pageContext }) => {
    const { allMarkdownRemark } = data;
    const { nodes } = allMarkdownRemark;

    if (nodes && nodes.length < 1) {
        return <Teaser />;
    }

    const calendarWindows = new Array(24).fill({
        title: '',
        day: '',
    });
    nodes.forEach(node => {
        calendarWindows[node.frontmatter.post_day - 1] = {
            title: node.frontmatter.title,
            day: node.frontmatter.post_day,
        };
    });

    return (
        <Layout calendarName={pageContext.calendar}>
            <Calendar id="calendar">
                {calendarWindows.map((calendarWindow, index) => (
                    <li key={calendarWindow.title || index}>
                        {calendarWindow.title ? (
                            <CalendarWindowOpen
                                link={createLink(
                                    pageContext.includeCalendarInPath,
                                    pageContext.calendar,
                                    pageContext.year,
                                    calendarWindow.day
                                )}
                                imageUrl={getWindowImagePlaceholder(index)}
                                title={calendarWindow.title}
                            />
                        ) : (
                            <CalendarWindowClosed day={index + 1} />
                        )}
                    </li>
                ))}
            </Calendar>
        </Layout>
    );
};

export const calendarPageQuery = graphql`
    query CalendarPage($calendar: String!, $year: Int!, $hideWindowsAfterDay: Int!) {
        allMarkdownRemark(
            filter: {
                frontmatter: {
                    calendar: { eq: $calendar }
                    post_year: { eq: $year }
                    post_day: { lte: $hideWindowsAfterDay }
                }
            }
        ) {
            nodes {
                fields {
                    enrichedAuthors {
                        title
                        socialMediaLink
                    }
                }
                frontmatter {
                    calendar
                    image
                    post_year
                    post_day
                    ingress
                    title
                }
            }
        }
    }
`;

export default Template;
