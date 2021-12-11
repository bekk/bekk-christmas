import { Box, Center, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { groq } from "next-sanity";
import React from "react";
import { Article } from "../../../../../features/article/Article";
import { BackButton } from "../../../../../features/post-list/BackButton";
import { SiteMetadata } from "../../../../../features/site-metadata/SiteMetadata";
import { shortDateFormat, toDayYear } from "../../../../../utils/date";
import { usePreviewSubscription } from "../../../../../utils/sanity/sanity.client";
import {
  filterDataToSingleItem,
  getClient,
} from "../../../../../utils/sanity/sanity.server";
import { toPlainText, urlFor } from "../../../../../utils/sanity/utils";

type PostPageProps = {
  data: Post;
  preview: boolean;
  query: string;
  queryParams: { slug: string };
};
export default function PostPage({
  query,
  queryParams,
  data: initialData,
  preview,
}: PostPageProps) {
  const { data } = usePreviewSubscription(query, {
    params: queryParams,
    initialData: [initialData],
    enabled: preview,
  });

  const [post] = data;

  const availableFromDate = post.availableFrom
    ? new Date(post.availableFrom)
    : new Date();

  const isAvailable =
    process.env.NODE_ENV === "development" ||
    preview ||
    availableFromDate < new Date();

  if (!isAvailable) {
    return <NotAvailableYet availableFrom={availableFromDate} />;
  }

  const authors = normalizeAuthors(post);
  return (
    <>
      <SiteMetadata
        title={preview ? `${post.title} [preview]` : post.title}
        description={toPlainText(post.description)}
        image={getImageUrl(post.coverImage)}
        author={authors.map((author) => author.fullName).join(", ")}
        canonicalUrl={post.canonicalUrl}
      />
      <Article
        backButtonHref={`/post/${availableFromDate.getFullYear()}/${availableFromDate.getDate()}`}
        backButtonText={shortDateFormat(availableFromDate)}
        type={post.type}
        embedUrl={post.embedUrl}
        podcastLength={post.podcastLength}
        title={post.title}
        description={post.description}
        categories={post.categories}
        content={post.content}
        publishedAt={availableFromDate}
        authors={authors}
        coverImage={post.coverImage?.hideFromPost ? undefined : post.coverImage}
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
          <BackButton />
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
    "categories": tags[]->{ name, "slug": slug }
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
      return `/post/${year}/${day}/${post.slug?.replace(/\//g, "")}`;
    }),
    fallback: "blocking",
  };
};

type Post = {
  id: string;
  type: "article" | "podcast" | "video";
  embedUrl?: string;
  podcastLength?: number;
  slug: string;
  canonicalUrl?: string;
  title: string;
  description: unknown[];
  content: unknown[];
  newAuthors: { fullName: string }[];
  oldAuthors: { fullName: string }[];
  categories: { name: string; slug: string }[];
  coverImage?: {
    _type: "image";
    hideFromPost?: boolean;
    asset: Record<string, any>;
  };
  availableFrom: string;
};

const getImageUrl = (image: any) => {
  if (!image) {
    return undefined;
  }
  if (typeof image.src === "string") {
    return image.src;
  }
  return urlFor(image).width(1200).url();
};
