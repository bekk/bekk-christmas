import React from 'react';
import { graphql } from 'gatsby';

export default function Template({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <main>
      <article>
        <h1>{frontmatter.title}</h1>
        <section dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </main>
  );
}

export const aboutPageQuery = graphql`
  query PostPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
