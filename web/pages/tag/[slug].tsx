import { Box, Heading } from "@chakra-ui/react";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { groq } from "next-sanity";
import React from "react";
import { SiteMetadata } from "../../features/layout/SiteMetadata";
import { PostList } from "../../features/post-list/PostList";
import { SummaryItem } from "../../features/post-list/SummaryItem";
import { getClient } from "../../utils/sanity/sanity.server";

export default function Tag({
  posts,
  tag,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Box>
      <SiteMetadata
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
      />
      <PostList posts={posts}>
        <SummaryItem>
          <Heading as="h1" fontWeight="400">
            All posts tagged with &quot;{tag.name}&quot;
          </Heading>
        </SummaryItem>
      </PostList>
    </Box>
  );
}

type Post = {
  _type: "post";
  slug: string;
  title: string;
  plaintextContent: string;
  tags: { name: string; slug: string }[];
  availableFrom: string;
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
        _type,
        "slug": slug.current, 
        title, 
        tags[]->{ name, "slug": slug },
        "plaintextContent": pt::text(content),
        availableFrom
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
