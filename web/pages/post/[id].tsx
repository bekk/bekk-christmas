import { Box, Container, Heading, Image, Skeleton, Stack, Text } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { Layout } from "../../features/layout/Layout";
import { IngressMarkdown } from "../../features/markdown/IngressMarkdown";
import { getAllPosts, getPostById, Post } from "../../utils/data";
import BlockContent from "@sanity/block-content-to-react";

export default function BlogPostPage({ post }) {
  const { tags, title, description, content, authorNames, coverImage, availableFrom } = post;
  const isAvailable = new Date(availableFrom) < new Date();
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
          <Text>Please check back in a few.</Text>
        </Stack>
      </Layout>
    );
  }
  return (
    <Layout
      title={`${title} - bekk.christmas`}
      description={description}
      headerLink="/"
      headerTitle={`Bekk Christmas / ${tags[0]}`}
    >
      <Box>
        {coverImage && (
          <Image
            src={coverImage}
            alt={title}
            width="100%"
            maxWidth="1200px"
            mx="auto"
            height="50vh"
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
            fallback={<Skeleton height="50vh" maxWidth="1200px" mx="auto" />}
          />
        )}
        <Stack as="article" mt={6}>
          <Box as="header" textAlign="center">
            <Container maxWidth="container.lg">
              <Heading as="h1" fontSize="6xl">
                {title}
              </Heading>
            </Container>
            <Text mb={12} mt={3}>
              {/* TODO: A {readingTime(content).text}{" "} */}
              {authorNames?.length > 0 && (
                <>
                  written by
                  <br />
                  <strong>{new Intl.ListFormat("en").format(authorNames)}</strong>
                </>
              )}
              <br />
              {availableFrom}
            </Text>
            {description && (
              <Container maxWidth="container.md" mx="auto" fontSize="2xl" textAlign="center">
                <IngressMarkdown>{description}</IngressMarkdown>
              </Container>
            )}
          </Box>
          <Box fontSize="lg">
            <BlockContent blocks={content} />
          </Box>
        </Stack>
      </Box>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params;
  const post = await getPostById(id);
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
