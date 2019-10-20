import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

const Template = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  return (
    <main>
      <Helmet>
        <title>{frontmatter.title}</title>
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.ingress} />
        <meta property="og:image" content={frontmatter.image} />
      </Helmet>
      <article>
        <h1>{frontmatter.title}</h1>
        <section dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </main>
  );
};

export const aboutPageQuery = graphql`
  query PostPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        ingress
        image
      }
    }
  }
`;

export default Template;
