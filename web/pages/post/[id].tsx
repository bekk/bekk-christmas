import {
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { groq } from "next-sanity";
import Link from "next/link";
import React from "react";
import readingTime from "reading-time";
import { SiteMetadata } from "../../features/layout/SiteMetadata";
import { PortableText } from "../../features/portable-text/PortableText";
import {
  toPlainText,
  usePreviewSubscription,
} from "../../utils/sanity/sanity.client";
import {
  filterDataToSingleItem,
  getClient,
} from "../../utils/sanity/sanity.server";

type BlogPostPageProps = {
  data: Post;
  preview: boolean;
  query: string;
  queryParams: { id: string };
};
export default function BlogPostPage({
  query,
  queryParams,
  data: initialData,
  preview,
}: BlogPostPageProps) {
  const { data } = usePreviewSubscription(query, {
    params: queryParams,
    initialData: [initialData],
    enabled: preview,
  });

  const [post] = data;

  const availableFromDate = post.availableFrom
    ? new Date(post.availableFrom)
    : new Date();

  const isAvailable = preview || availableFromDate < new Date();

  if (!isAvailable) {
    return (
      <Text>
        This article is not yet available. Check back at{" "}
        {availableFromDate.toLocaleDateString("nb-no")}
      </Text>
    );
  }

  const authors = post.authors?.filter((author) => author);
  return (
    <Flex minHeight="100vh" flexDirection="column">
      <SiteMetadata
        title={preview ? `${post.title} [preview]` : post.title}
        description={post.description}
        author={authors.join(", ")}
      />
      <Box
        as="header"
        background="brand.green"
        color="brand.pink"
        minHeight="33vh"
      >
        <Container maxWidth="container.md" padding="2.5rem">
          <Flex>
            <Link href="/" passHref>
              <IconButton
                as="a"
                href="/"
                aria-label={`See more posts for December ${availableFromDate.toLocaleDateString()}`}
                title={`See more posts for December ${availableFromDate.toLocaleDateString()}`}
                variant="outline"
                colorScheme="white"
              >
                <Box
                  width="0.7em"
                  height="0.7em"
                  borderLeft="1px solid currentColor"
                  borderTop="1px solid currentColor"
                  transform="rotate(-45deg)"
                  position="relative"
                  left="0.2em"
                />
              </IconButton>
            </Link>
            <Box flex="1" fontSize="24px" ml="4" color="white">
              Article
            </Box>
          </Flex>
          <Box marginTop="10">
            {readingTime(toPlainText(post.content)).text}
          </Box>
          <Heading as="h1" fontSize="56px" lineHeight="66px" fontWeight="400">
            {post.title ?? "No title yet"}
          </Heading>
        </Container>
      </Box>
      <Box backgroundColor="brand.pink" color="brand.green" flex="1" py="6">
        {post.description && (
          <Container
            maxWidth="container.md"
            textAlign={["left", "center"]}
            fontSize="2xl"
            mb="4"
            px="2.5rem"
          >
            {post.description}
          </Container>
        )}
        <Container maxWidth="container.md" textAlign="center">
          <strong>
            {authors.length > 0
              ? new Intl.ListFormat("en").format(authors)
              : "No authors"}
          </strong>{" "}
          – {availableFromDate.toLocaleDateString("nb-no")}
        </Container>
        <Container maxWidth="container.md" mt="4" px={0} fontSize="20px">
          {post.content ? (
            <PortableText blocks={post.content} />
          ) : (
            <Text>No content</Text>
          )}
        </Container>
      </Box>
    </Flex>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const id = params.id as string;
  const query = groq`*[_type == 'post' && _id == $id] {
    ..., 
    "authors": authors[].fullName, 
    "tags": tags[]->.name
  }`;
  const allPosts = await getClient(preview).fetch<Post[]>(query, { id });
  const post = filterDataToSingleItem(allPosts, preview);
  if (!allPosts || !post) {
    return { notFound: true };
  }

  return {
    props: {
      preview,
      data: post,
      query,
      queryParams: { id: id.replace("drafts.", "") },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  type PostId = { _id: string };
  const allPosts = await getClient().fetch<PostId[]>(
    groq`*[_type == 'post'] { _id }`
  );
  return {
    paths: allPosts.map((post) => `/post/${post._id}`),
    fallback: false,
  };
};

type Post = {
  id: string;
  title: string;
  description: string;
  content: any;
  authors: string[];
  tags: string[];
  coverImage?: string;
  availableFrom: string;
};
