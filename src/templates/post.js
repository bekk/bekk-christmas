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
import { setImageWidth } from '../utils';

const fallbackImage =
    'https://images.unsplash.com/photo-1512389142860-9c449e58a543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80';

const MaxWidth = styled.article`
    margin: 2em auto;
`;

const HeroImage = styled.img`
    width: 100%;
    height: 400px;
    object-fit: cover;
    margin: 50px 0;
`;

const Ingress = styled.section`
    font-size: 24px;
    font-family: DINW01Regular, sans-serif;

    max-width: 759px;
    margin-left: auto;
    margin-right: auto;
`;

const RelevantLinksContainer = styled.section(
    ({ theme }) => `
    a {
        color: ${theme.linkTextColor};
        margin-right:2em;
    }
    `
);

const TitleContainer = styled.h1`
    font-size: 48px;
    margin-top: 0;
    text-align: center;
`;

const Template = ({ data }) => {
    const { markdownRemark } = data;
    const { frontmatter, html, timeToRead, fields } = markdownRemark;
    const { calendar, description, title, ingress, image, links } = frontmatter;

    const ingressHtml = remark()
        .use(recommended)
        .use(remarkHtml)
        .processSync(ingress)
        .toString();

    const heroImage = setImageWidth(image || fallbackImage);
    const seoDescription = description || `An article from ${calendar}`;

    const htmlWithImageStyling = html.replace(/<p><img/g, '<p class="p-with-img"><img');
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
                    />
                )}
                <HeroImage src={heroImage} alt="" />

                <PrismThemer>
                    <Ingress dangerouslySetInnerHTML={{ __html: ingressHtml }} />
                    <ArticleBody>
                        <section dangerouslySetInnerHTML={{ __html: htmlWithImageStyling }} />
                    </ArticleBody>
                </PrismThemer>
                {links && links.length > 0 && (
                    <RelevantLinksContainer>
                        <h2>Relevant links</h2>
                        {links.map(link => (
                            <a key={link.url} href={link.url}>
                                {link.title}
                            </a>
                        ))}
                    </RelevantLinksContainer>
                )}
            </MaxWidth>
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
                links {
                    title
                    url
                }
            }
        }
    }
`;

export default Template;
