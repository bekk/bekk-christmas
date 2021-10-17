import { Box, Center, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { groq } from "next-sanity";
import React from "react";
import { Article } from "../../../../features/article/Article";
import { ArticleBackButton } from "../../../../features/article/ArticleBackButton";
import { SiteMetadata } from "../../../../features/layout/SiteMetadata";
import { SiteFooter } from "../../../../features/site-footer/SiteFooter";
import { toDayYear } from "../../../../utils/date";
import { usePreviewSubscription } from "../../../../utils/sanity/sanity.client";
import {
  filterDataToSingleItem,
  getClient,
} from "../../../../utils/sanity/sanity.server";
import { urlFor } from "../../../../utils/sanity/utils";

type BlogPostPageProps = {
  data: Post;
  preview: boolean;
  query: string;
  queryParams: { slug: string };
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
    return <NotAvailableYet availableFrom={availableFromDate} />;
  }

  const authors = normalizeAuthors(post);
  return (
    <>
      <SiteMetadata
        title={preview ? `${post.title} [preview]` : post.title}
        description={post.description}
        image={getImageUrl(post.coverImage)}
        author={authors.map((author) => author.fullName).join(", ")}
      />
      <Article
        title={post.title}
        description={post.description}
        category="Article"
        content={post.content}
        publishedAt={availableFromDate}
        authors={authors}
        showReadingTime
      />
    </>
  );
}

/** We have two different types of authors, legacy ones and "new" ones.
 *
 * The legacy ones are regular objects, while the new ones are references to
 * author documents. In order to access them together, we need to do this little trick.
 *
 * // TODO: Normalize the actual author data to the new format,
 * // and remove this function
 */
const normalizeAuthors = (post: Post) =>
  [...(post.oldAuthors || []), ...(post.newAuthors || [])].filter(
    (author) => author?.fullName
  );

type NotAvailableYetProps = {
  availableFrom?: Date;
};
const NotAvailableYet = ({ availableFrom }: NotAvailableYetProps) => {
  return (
    <Box>
      <Flex
        flexDirection="column"
        minHeight="100vh"
        background="brand.darkGreen"
        color="brand.pink"
        padding="2.5rem"
      >
        <Container maxWidth="container.md">
          <ArticleBackButton />
        </Container>
        <Center textAlign="center" flex="1">
          <Box>
            <Heading as="h1" fontSize="56px" lineHeight="66px" fontWeight="400">
              This post is not available yet.
            </Heading>
            <Text fontSize="xl">
              This article is not yet available. Check back at{" "}
              {availableFrom.toLocaleDateString("nb-no")}
            </Text>
          </Box>
        </Center>
      </Flex>
      <SiteFooter />
    </Box>
  );
};

export const getStaticProps = async ({
  params,
  preview = false,
}: GetStaticPropsContext) => {
  const slug = params.slug as string;
  const query = groq`*[_type == 'post' && slug.current == $slug] {
    ..., 
    "newAuthors": authors[]->{ fullName },
    "oldAuthors": authors[].fullName,
    "tags": tags[]->.name
  }`;
  const allPosts = await getClient(preview).fetch<Post[]>(query, { slug });
  const post = filterDataToSingleItem(allPosts, preview);
  if (!allPosts || !post) {
    return { notFound: true };
  }

  return {
    props: {
      preview,
      data: post,
      query,
      queryParams: { slug },
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  type PathResult = { slug: string; availableFrom?: string };
  const allPosts = await getClient().fetch<PathResult[]>(
    groq`*[_type == 'post'] { "slug": slug.current, availableFrom }`
  );
  return {
    paths: allPosts.map((post) => {
      const { year, day } = toDayYear(post.availableFrom);
      return `/post/${year}/${day}/${post.slug}`;
    }),
    fallback: "blocking",
  };
};

type Post = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: any;
  newAuthors: { fullName: string }[];
  oldAuthors: { fullName: string }[];
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
