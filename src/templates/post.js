import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import ArticleBody from '../components/ArticleBody';
import Layout from '../components/Layout';
import AuthorInfo from '../components/Author';

const fallbackImage =
    'https://images.unsplash.com/photo-1512389142860-9c449e58a543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80';

const MaxWidth = styled.article`
    max-width: 700px;
    margin: 2em auto;
`;

const HeroImage = styled.img`
    width: 100%;
    height: 400px;
    object-fit: cover;
`;

const Ingress = styled.p`
    font-size: 22px;
`;

const Template = ({ data }) => {
    const { markdownRemark } = data;
    const { frontmatter, html, timeToRead, fields } = markdownRemark;
    const { calendar, title, ingress, image, links } = frontmatter;

    return (
        <Layout calendar={calendar}>
            <Helmet>
                <title>{title}</title>
                <meta property="og:title" content={title} />
                <meta property="og:description" content={ingress} />
                <meta property="og:image" content={image} />
            </Helmet>
            <MaxWidth>
                {fields && fields.enrichedAuthors && (
                    <AuthorInfo
                        authors={fields && fields.enrichedAuthors}
                        readingTime={timeToRead}
                        calendar={calendar}
                    />
                )}
                <HeroImage src={image || fallbackImage} alt="" />
                <Ingress>{ingress}</Ingress>
                <ArticleBody dangerouslySetInnerHTML={{ __html: html }} />
                {links && links.length > 0 && (
                    <>
                        <h2>Relevant links</h2>
                        {links.map(link => (
                            <a href={link.url}>{link.title}</a>
                        ))}
                    </>
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
