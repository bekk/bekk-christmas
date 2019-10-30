import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import ArticleBody from '../components/ArticleBody';
import Layout from '../components/Layout';
import AuthorInfo from '../components/Author';

const MaxWidth = styled.article`
    max-width: 700px;
    margin: 2em auto;
`;

const Template = ({ data }) => {
    const { markdownRemark } = data;
    const { frontmatter, html, timeToRead, fields } = markdownRemark;

    return (
        <Layout calendar={frontmatter.calendar}>
            <Helmet>
                <title>{frontmatter.title}</title>
                <meta property="og:title" content={frontmatter.title} />
                <meta property="og:description" content={frontmatter.ingress} />
                <meta property="og:image" content={frontmatter.image} />
            </Helmet>
            <MaxWidth>
                <ArticleBody dangerouslySetInnerHTML={{ __html: html }} />
            </MaxWidth>
        </Layout>
    );
};

export const aboutPageQuery = graphql`
    query PostPage($id: String!) {
        markdownRemark(id: { eq: $id }) {
            html
            fields {
                enrichedAuthors {
                    avatar
                    description
                    title
                    twitterHandle
                }
            }
            frontmatter {
                title
                ingress
                image
            }
        }
    }
`;

export default Template;
