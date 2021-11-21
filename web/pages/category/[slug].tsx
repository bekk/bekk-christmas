import { Box, Heading } from "@chakra-ui/react";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { groq } from "next-sanity";
import React from "react";
import { SiteMetadata } from "../../features/site-metadata/SiteMetadata";
import { PostList } from "../../features/post-list/PostList";
import { getClient } from "../../utils/sanity/sanity.server";

export default function Tag({
  posts,
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Box>
      <SiteMetadata
        title={`Posts in the "${category.name}" category | Bekk Christmas`}
        description={`Discover posts in the "${category.name}" category`}
        keywords={[
          "tech",
          "technology",
          "design",
          "ux",
          "visual",
          "strategy",
          "business",
          "articles",
          category.name,
          ...(category.synonyms || []),
        ]}
      />
      <PostList posts={posts} heading={category.name} />
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
  description: unknown[];
};
type Category = {
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
  const categoryRequest = client.fetch<Category>(
    groq`*[_type == "tag" && slug == $slug] 
    { name, synonyms }[0]`,
    { slug }
  );

  return {
    props: {
      posts: await postsRequest,
      category: await categoryRequest,
    },
    revalidate: 10,
  };
};

type StaticPathResult = {
  slug: string;
};
export const getStaticPaths: GetStaticPaths = async () => {
  const allCategories = await getClient().fetch<StaticPathResult[]>(
    groq`*[_type == "tag"] { slug }`
  );
  return {
    paths: allCategories.map((tag) => `/category/${tag.slug}`),
    fallback: "blocking",
  };
};
