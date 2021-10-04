import { Heading, Stack, Text } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { Layout } from "../../../features/layout/Layout";
import { PostPageTemplate } from "../../../features/post-page-template/PostPageTemplate";
import { getAllPosts, getPostById, Post } from "../../../utils/data";

type BlogPostPageProps = {
  post: Post;
};
export default function BlogPostPage({ post }: BlogPostPageProps) {
  const isAvailable = new Date(post.availableFrom) < new Date();
  if (!isAvailable) {
    return (
      <Layout
        title="Not available yet!"
        description="This article isn't available yet"
        headerLink="/"
      >
        <Stack textAlign="center">
          <Heading as="h1" fontSize="6xl">
            Article isn&apos;t available yet
          </Heading>
          <Text>Please check back later.</Text>
        </Stack>
      </Layout>
    );
  }
  const noNullAuthors = post.authors.filter((author) => author);
  return <PostPageTemplate post={{ ...post, authors: noNullAuthors }} />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params;
  const post = await getPostById(id as string);
  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPosts();
  return {
    paths: allPosts.map((post) => `/post/${post.id}`),
    fallback: false,
  };
};
