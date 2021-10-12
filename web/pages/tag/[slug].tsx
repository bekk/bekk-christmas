import { Heading, ListItem, Stack, UnorderedList } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { TextLink } from "../../features/design-system/TextLink";
import { Layout } from "../../features/layout/Layout";
import { getAllTags, getPostsByTag, PostLink } from "../../utils/data";

type Props = {
  posts: PostLink[];
  slug: string;
};
export default function Tag({ posts, slug }: Props) {
  return (
    <Layout
      title="Tags | Bekk Christmas"
      description="Browse the different tags in our catalog"
      keywords={[
        "tech",
        "technology",
        "design",
        "ux",
        "visual",
        "strategy",
        "business",
        "articles",
      ]}
    >
      <Stack as="section" mb={12} maxWidth="container.lg" mx="auto">
        <Heading>All posts in {slug}</Heading>
        <UnorderedList>
          {posts.map(({ title, id }) => (
            <ListItem key={title}>
              <TextLink href={`/post/${id}`}>{title}</TextLink>
            </ListItem>
          ))}
        </UnorderedList>
      </Stack>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug = "" } = context.params;
  return {
    props: {
      posts: await getPostsByTag(slug as string),
      slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allTags = await getAllTags();
  return {
    paths: allTags.map((tag) => `/tag/${tag.slug}`),
    fallback: false,
  };
};
