import { Heading, ListItem, Stack, UnorderedList } from "@chakra-ui/react";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { groq } from "next-sanity";
import React from "react";
import { TextLink } from "../../features/design-system/TextLink";
import { Layout } from "../../features/layout/Layout";
import { getClient } from "../../utils/sanity/sanity.server";

export default function Tag({
  posts,
  tag,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title={`Posts tagged with "${tag.name}" | Bekk Christmas`}
      description={`Discover posts tagged with "${tag.name}"`}
      keywords={[
        "tech",
        "technology",
        "design",
        "ux",
        "visual",
        "strategy",
        "business",
        "articles",
        tag.name,
        ...(tag.synonyms || []),
      ]}
    >
      <Stack as="section" mb={12} maxWidth="container.lg" mx="auto">
        <Heading>All posts in {tag.name}</Heading>
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

type Post = {
  id: string;
  title: string;
};
type Tag = {
  name: string;
  synonyms: string[];
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { slug = "" } = context.params;

  const client = getClient();

  const postsRequest = client.fetch<Post[]>(
    groq`*[
      _type == "post" 
      && references(*[_type == "tag" && slug == $slug]._id)] 
      { 
        "id": _id, 
        title,
      }`,
    { slug }
  );
  const tagRequest = client.fetch<Tag>(
    groq`*[_type == "tag" && slug == $slug] 
    { name, synonyms }[0]`,
    { slug }
  );

  return {
    props: {
      posts: await postsRequest,
      tag: await tagRequest,
    },
    revalidate: 10,
  };
};

type StaticPathResult = {
  slug: string;
};
export const getStaticPaths: GetStaticPaths = async () => {
  const allTags = await getClient().fetch<StaticPathResult[]>(
    groq`*[_type == "tag"] { slug }`
  );
  return {
    paths: allTags.map((tag) => `/tag/${tag.slug}`),
    fallback: "blocking",
  };
};
