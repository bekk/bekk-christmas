import React from 'react';
import { graphql, Link } from 'gatsby';
import Tre from '../components/Tre';
import Ingress from '../components/Ingress';
import Window from '../components/Window';
import Calendar from '../components/Calendar';
import Number from '../components/Number';
import Layout from '../components/Layout';

const createLink = (path, day) => {
    if (!day) {
        return path;
    }

    let link = path;

    link += `/${day}`;

    return link;
};

const Template = ({ data, pageContext }) => {
    const { allMarkdownRemark } = data;
    const { nodes } = allMarkdownRemark;

    const windows = new Array(24).fill({
        title: '',
        year: '',
        day: '',
    });
    nodes.forEach(node => {
        windows[node.frontmatter.post_day - 1] = {
            title: node.frontmatter.title,
            year: node.frontmatter.post_year,
            day: node.frontmatter.post_day,
        };
    });

    return (
        <Layout calendar={pageContext.calendar}>
            <Calendar>
                {windows.map((window, index) => (
                    <Link
                        to={createLink(pageContext.startOfLink, window.day)}
                        replace={false}
                        style={{ textDecoration: 'none' }}
                    >
                        <Window>
                            {!window.title && <Number>{`${index + 1}`}</Number>}
                            {window.title && <Tre />}
                        </Window>
                        {window.title && <Ingress>{window.title}</Ingress>}
                    </Link>
                ))}
            </Calendar>
        </Layout>
    );
};

export const calendarPageQuery = graphql`
    query CalendarPage($calendar: String!, $year: Int!) {
        allMarkdownRemark(
            filter: { frontmatter: { calendar: { eq: $calendar }, post_year: { eq: $year } } }
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
