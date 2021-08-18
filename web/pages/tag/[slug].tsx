import { Heading, Link, Stack } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { Layout } from "../../features/layout/Layout";
import { getAllTags, getPostsByTag } from "../../utils/data";

type Props = {
  posts: { title: string; id: string }[];
  slug: string;
};
export default function Tag({ posts, slug }: Props) {
  return (
    <Layout
      title="Bekk Christmas - advent calendars about tech, design and strategy"
      description="Get in the holiday spirit by diving into some of the many hundred articles we've made for you"
      headerLink="/"
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
        <ul>
          {posts.map(({ title, id }) => (
            <li key={title}>
              <Link href={`/post/${id}`}>{title}</Link>
            </li>
          ))}
        </ul>
      </Stack>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug = "" } = context.params;
  return {
    props: {
      posts: await getPostsByTag(slug),
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
