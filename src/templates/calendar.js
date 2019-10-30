import React from 'react';
import styled from 'styled-components';
import { graphql, Link } from 'gatsby';

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

const Calendar = styled.article`
    max-width: 880px;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
`;

const Window = styled.section`
    box-sizing: border-box;
    padding: 20px;
    margin: 10px;
    width: 200px;
    height: 200px;
    background: red;
    color: white;
`;

const Template = ({ data }) => {
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

    console.log(windows);

    return (
        <main>
            <Calendar>
                {windows.map((window, index) => (
                    <Link to={createLink(window.year, window.day)}>
                        <Window>
                            <h1>{`${index + 1}: ${window.title}`}</h1>
                        </Window>
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
