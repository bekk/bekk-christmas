import React from 'react';
import styled from 'styled-components';
import { graphql, Link } from 'gatsby';
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

const RelevantLinksContainer = styled.section`
    a {
        color: var(--link-text-color);
        margin-right: 32px;
    }
`;

const TitleContainer = styled.h1`
    font-size: 3em;
    margin-top: 0;
    text-align: center;
    max-width: 760px;
    margin: auto;
`;

const PostNavigation = styled.div`
    display: flex;
    max-width: 760px;
    width: 100%;
    margin: 30px auto;
`;

const Template = ({ data, pageContext }) => {
    const { markdownRemark } = data;
    const { frontmatter, html, timeToRead } = markdownRemark;
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

    const authors = frontmatter.authors && frontmatter.authors.map(author => author.frontmatter);
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
    const trimmedDescription = description ? description.trim() : '';
    const seoDescription =
        trimmedDescription ||
        ingressHtml.replace(/<[^>]*>?/gm, '').trim() ||
        `An article from ${calendar}`;

    const path = `${pageContext.isPreview ? `/${calendar}` : ''}/${post_year}/`;

    return (
        <Layout calendarName={calendar} year={post_year}>
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
                {authors && (
                    <AuthorInfo
                        authors={authors}
                        readingTime={timeToRead}
                        calendar={calendar}
                        year={post_year}
                        day={post_day}
                    />
                )}
                {image && <HeroImage src={heroImage} alt="" />}
                <PostNavigation>
                    {pageContext.showPrevLink && (
                        <Link to={`${path}/${post_day - 1}`} style={{ marginRight: 'auto' }}>
                            Previous post
                        </Link>
                    )}
                    {pageContext.showNextLink && (
                        <Link to={`${path}/${post_day + 1}`} style={{ marginLeft: 'auto' }}>
                            Next post
                        </Link>
                    )}
                </PostNavigation>
                <PrismThemer>
                    <ArticleBody>
                        <Ingress dangerouslySetInnerHTML={{ __html: ingressHtml }} />
                        <section dangerouslySetInnerHTML={{ __html: html }} />
                    </ArticleBody>
                </PrismThemer>
                <PostNavigation>
                    {pageContext.showNextLink && (
                        <Link to={`${path}/${post_day + 1}`}>Read the next post</Link>
                    )}
                </PostNavigation>
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
                                        uniqueLinkImageNumbers[index],
                                        post_year
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
                authors {
                    frontmatter {
                        title
                        socialMediaLink
                        company
                    }
                }
            }
        }
    }
`;

export default Template;
