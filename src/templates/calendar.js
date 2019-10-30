import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

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
        day: '',
    });
    nodes.forEach(node => {
        windows[node.frontmatter.post_day - 1] = {
            title: node.frontmatter.title,
            day: node.frontmatter.post_day,
        };
    });

    return (
        <main>
            <Calendar>
                {windows.map((window, index) => (
                    <a href={`./${window.day}`}>
                        <Window>
                            <h1>{`${index + 1}: ${window.title}`}</h1>
                        </Window>
                    </a>
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
