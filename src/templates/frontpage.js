import React from 'react';
import Layout from '../components/Layout';
import { Link, graphql } from 'gatsby';

const Template = ({ pageContext }) => {
    return (
        <Layout>
            {pageContext.calendarsWithContent && pageContext.calendarsWithContent.length > 0 && (
                <article>
                    <h2>Calendars with content</h2>
                    <ul>
                        {pageContext.calendarsWithContent.map(link => (
                            <li>
                                <Link to={link}>{link}</Link>
                            </li>
                        ))}
                    </ul>
                </article>
            )}
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

export default Template;
