import {
  Box,
  Container,
  Heading,
  Image,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { groq } from "next-sanity";
import React from "react";
import readingTime from "reading-time";
import { Layout } from "../../features/layout/Layout";
import { PortableText } from "../../features/portable-text/PortableText";
import {
  toPlainText,
  urlFor,
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
  data: initialData,
  preview,
  query,
  queryParams,
}: BlogPostPageProps) {
  const { data } = usePreviewSubscription(query, {
    params: queryParams,
    initialData: [initialData],
    enabled: preview,
  });

  const [post] = data;

  const isAvailable = preview || new Date(post.availableFrom) < new Date();
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

  const imageUrl = getImageUrl(post.coverImage);
  // Some authors may be null (at least for now), so we filter them out
  post.authors = post.authors?.filter((author: string | null) => author) ?? [];
  return (
    <Layout
      title={`${post.title ?? "No title"} - bekk.christmas`}
      description={post.description ?? "No description"}
      image={imageUrl}
      author={post.authors?.join(", ")}
      preview={preview}
    >
      <Box>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={post.title ?? "No title"}
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
                {post.title ?? "[No title]"}
                {preview && " (preview)"}
              </Heading>
            </Container>
            <Text mb={12} mt={3}>
              A {readingTime(toPlainText(post.content)).text}{" "}
              {post.authors?.length > 0 && (
                <>
                  by
                  <br />
                  <strong>
                    {post.authors.length > 0
                      ? new Intl.ListFormat("en").format(post.authors)
                      : "No authors"}
                  </strong>
                </>
              )}
              <br />
              {new Date(post.availableFrom ?? Date.now()).toLocaleDateString(
                "nb-NO"
              )}
            </Text>
            {post.description && (
              <Container
                maxWidth="container.md"
                mx="auto"
                fontSize="2xl"
                textAlign="center"
              >
                {post.description}
              </Container>
            )}
          </Box>
          <Box fontSize="lg">
            <PortableText blocks={post.content} />
          </Box>
        </Stack>
      </Box>
    </Layout>
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

const getImageUrl = (image: any) => {
  if (!image) {
    return null;
  }
  if (typeof image.src === "string") {
    return image.src;
  }
  return urlFor(image).width(1200).url();
};
