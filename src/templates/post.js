import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import remark from 'remark';
import recommended from 'remark-preset-lint-recommended';
import remarkHtml from 'remark-html';

import ArticleBody from '../components/ArticleBody';
import Layout from '../components/Layout';
import AuthorInfo from '../components/Author';
import PrismThemer from '../components/PrismThemer';
import Calendar from '../components/Calendar';
import { setImageWidth, getWindowImagePlaceholder } from '../utils';
import CalendarWindowOpen from '../components/CalendarWindowOpen';
import * as mediaQueries from '../constants/media-queries';

const fallbackImage =
    'https://images.unsplash.com/photo-1512389142860-9c449e58a543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80';

const MaxWidth = styled.article`
    max-width: 1258px;
    margin: 32px auto;
    padding: 10px;
    ${mediaQueries.mediumUp} {
        padding: 10px;
    }
`;

const ReadMoreHeader = styled.h2`
    padding: 10px;
    ${mediaQueries.mediumUp} {
        padding: 10px;
    }
`;

const HeroImage = styled.img`
    width: 100%;
    height: 400px;
    object-fit: cover;
    margin: 50px 0;
`;

const Ingress = styled.section`
    font-size: 1.5em;
    font-family: DINW01Regular, sans-serif;

    max-width: 759px;
    margin-left: auto;
    margin-right: auto;
`;

const RelevantLinksContainer = styled.section(
    ({ theme }) => `
    a {
        color: ${theme.linkTextColor};
        margin-right: 32px;
    }
    `
);

const TitleContainer = styled.h1`
    font-size: 3em;
    margin-top: 0;
    text-align: center;
    max-width: 760px;
    margin: auto;
`;

const Template = ({ data }) => {
    const { markdownRemark } = data;
    const { frontmatter, html, timeToRead, fields } = markdownRemark;
    const {
        calendar,
        description,
        title,
        ingress,
        image,
        links,
        post_day,
        post_year,
    } = frontmatter;

    const firstFourLinks = links != null && links.slice(0, 4);
    const uniqueLinkImageNumbers = [];
    while (uniqueLinkImageNumbers.length < 4) {
        const max = 14;
        var randomNumber = Math.floor(Math.random() * Math.floor(max)) + 1;
        if (uniqueLinkImageNumbers.indexOf(randomNumber) === -1) {
            uniqueLinkImageNumbers.push(randomNumber);
        }
    }
    const ingressHtml =
        remark()
            .use(recommended)
            .use(remarkHtml)
            .processSync(ingress)
            .toString() || '';

    const heroImage = setImageWidth(image || fallbackImage);
    const seoDescription =
        description || ingressHtml.replace(/<[^>]*>?/gm, '') || `An article from ${calendar}`;

    return (
        <Layout calendarName={calendar}>
            <Helmet>
                <html lang="en" />
                <title>{title}</title>
                <meta property="description" content={seoDescription} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={seoDescription} />
                <meta property="og:image" content={heroImage} />
            </Helmet>
            <TitleContainer>{title}</TitleContainer>
            <MaxWidth>
                {fields && fields.enrichedAuthors && (
                    <AuthorInfo
                        authors={fields && fields.enrichedAuthors}
                        readingTime={timeToRead}
                        calendar={calendar}
                        year={post_year}
                        day={post_day}
                    />
                )}
                {image && <HeroImage src={heroImage} alt="" />}

                <PrismThemer>
                    <Ingress dangerouslySetInnerHTML={{ __html: ingressHtml }} />
                    <ArticleBody>
                        <section dangerouslySetInnerHTML={{ __html: html }} />
                    </ArticleBody>
                </PrismThemer>
            </MaxWidth>
            {firstFourLinks && firstFourLinks.length > 0 && (
                <RelevantLinksContainer>
                    <ReadMoreHeader>Read more outside the calendar</ReadMoreHeader>
                    <Calendar>
                        {firstFourLinks.map((link, index) => (
                            <li key={link.url}>
                                <CalendarWindowOpen
                                    title={link.title}
                                    href={link.url}
                                    imageUrl={getWindowImagePlaceholder(
                                        frontmatter.calendar,
                                        uniqueLinkImageNumbers[index]
                                    )}
                                />
                            </li>
                        ))}
                    </Calendar>
                </RelevantLinksContainer>
            )}
        </Layout>
    );
};

export const aboutPageQuery = graphql`
    query PostPage($id: String!) {
        markdownRemark(id: { eq: $id }) {
            html
            timeToRead
            fields {
                enrichedAuthors {
                    title
                    socialMediaLink
                    company
                }
            }
            frontmatter {
                calendar
                title
                ingress
                image
                post_year
                post_day
                links {
                    title
                    url
                }
            }
        }
    }
`;

export default Template;
