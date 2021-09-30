import { Box, Container, Heading, Image, Skeleton, Stack, Text } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import readingTime from "reading-time";
import { Layout } from "../../features/layout/Layout";
import { ContentPortableText } from "../../features/portable-text/PortableText";
import { getAllPosts, getPostById, Post } from "../../utils/data";
import { toPlainText, urlFor } from "../../utils/sanity/sanity.client";

type BlogPostPageProps = {
  post: Post;
};
export default function BlogPostPage({
  post: { title, description, content, authors, coverImage, availableFrom },
}: BlogPostPageProps) {
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
          <Text>Please check back later.</Text>
        </Stack>
      </Layout>
    );
  }
  const noNullAuthors = authors.filter((author) => author);
  const imageUrl = getImageUrl(coverImage);
  return (
    <Layout
      title={`${title} - bekk.christmas`}
      description={description}
      image={imageUrl}
      author={authors.join(", ")}
    >
      <Box>
        {coverImage && (
          <Image
            src={imageUrl}
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
              A {readingTime(toPlainText(content)).text}{" "}
              {noNullAuthors.length > 0 && (
                <>
                  by
                  <br />
                  <strong>{new Intl.ListFormat("en").format(noNullAuthors)}</strong>
                </>
              )}
              <br />
              {new Date(availableFrom).toLocaleDateString("nb-NO")}
            </Text>
            {description && (
              <Container maxWidth="container.md" mx="auto" fontSize="2xl" textAlign="center">
                {description}
              </Container>
            )}
          </Box>
          <Box fontSize="lg">
            <ContentPortableText blocks={content} />
          </Box>
        </Stack>
      </Box>
    </Layout>
  );
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

const getImageUrl = (image: any) => {
  if (!image) {
    return "/fallback-image.jpg";
  }
  if (typeof image.src === "string") {
    return image.src;
  }
  return urlFor(image).width(1200).url();
};
