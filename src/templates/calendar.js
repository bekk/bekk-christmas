import React from 'react';
import { graphql, Link } from 'gatsby';
import Tre from '../components/Tre';
import Top from '../components/Top';
import Ingress from '../components/Ingress';
import Window from '../components/Window';
import Calendar from '../components/Calendar';
import Number from '../components/Number';

const createLink = (year, day) => {
    if (!year || !day) {
        return '';
    }

    let link = '';
    if (year !== 2019) {
        link += `/${year}`;
    }
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
        <main>
            <Top calendar={pageContext.calendar} />
            <Calendar>
                {windows.map((window, index) => (
                    <Link
                        to={createLink(window.year, window.day)}
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
        </main>
    );
};

export const aboutPageQuery = graphql`
    query CalendarPage($calendar: String!, $year: Int!) {
        allMarkdownRemark(
            filter: { frontmatter: { calendar: { eq: $calendar }, post_year: { eq: $year } } }
        ) {
            nodes {
                fields {
                    enrichedAuthors {
                        avatar
                        description
                        title
                        twitterHandle
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
