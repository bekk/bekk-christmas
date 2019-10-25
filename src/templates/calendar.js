import React from 'react';
import { graphql } from 'gatsby';

const Template = ({ data }) => {
    const { allMarkdownRemark } = data;
    const { nodes } = allMarkdownRemark;

    return (
        <main>
            <article>
                {nodes.map(node => (
                    <section>
                        <h1>{node.frontmatter.title}</h1>
                        <p>{node.frontmatter.post_day}</p>
                    </section>
                ))}
            </article>
        </main>
    );
};

export const aboutPageQuery = graphql`
    query CalendarPage($calendar: String!, $year: Int!) {
        allMarkdownRemark(
            filter: { frontmatter: { calendar: { eq: $calendar }, post_year: { eq: $year } } }
        ) {
            nodes {
                frontmatter {
                    author
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
