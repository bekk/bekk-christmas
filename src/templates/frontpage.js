import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';
import Calendar from '../components/Calendar';
import CalendarWindowOpen from '../components/CalendarWindowOpen';

import { getWindowImagePlaceholder } from '../utils';

const Template = ({ pageContext }) => {
    return (
        <Layout>
            {pageContext.calendarsWithContent && pageContext.calendarsWithContent.length > 0 && (
                <Calendar>
                    {pageContext.calendarsWithContent.map((link, index) => (
                        <li key={link}>
                            <CalendarWindowOpen
                                link={link}
                                imageUrl={getWindowImagePlaceholder(index)}
                                title={link}
                            />
                        </li>
                    ))}
                </Calendar>
            )}
        </Layout>
    );
};

export const frontpageQuery = graphql`
    query FrontPage($day: Int!, $year: Int!) {
        allMarkdownRemark(
            filter: { frontmatter: { post_day: { eq: $day }, post_year: { eq: $year } }, calendar: { eq: null } }
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

export default Template;
