import { Box } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { groq } from "next-sanity";
import React from "react";
import { ArticleItemType } from "../../features/post-list/ArticleItem";
import { PodcastItemType } from "../../features/post-list/PodcastItem";
import { PostList } from "../../features/post-list/PostList";
import { VideoItemType } from "../../features/post-list/VideoItem";
import { SiteMetadata } from "../../features/site-metadata/SiteMetadata";
import { toISODateString } from "../../utils/date";
import { getClient } from "../../utils/sanity/sanity.server";

type CategoryPageProps = {
  posts: (ArticleItemType | PodcastItemType | VideoItemType)[];
  category: Category;
};
export default function CategoryPage({ posts, category }: CategoryPageProps) {
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
      <PostList
        posts={posts}
        heading={category.name}
        backButtonLabel="Back to all categories"
        backButtonHref="/category"
      />
    </Box>
  );
}

type Category = {
  name: string;
  synonyms: string[];
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { slug = "" } = context.params;

  const client = getClient();

  const postsRequest = client.fetch<
    (ArticleItemType | PodcastItemType | VideoItemType)[]
  >(
    groq`*[
      _type == "post" 
      && availableFrom <= $now
      && references(*[_type == "tag" && slug == $slug]._id)]
      | order(availableFrom desc)
      { 
        _type,
        type,
        "slug": slug.current, 
        title, 
        tags[]->{ name, "slug": slug },
        "description": pt::text(description),
        "plaintextContent": pt::text(content),
        availableFrom,
        podcastLength
      }`,
    { slug, now: toISODateString(new Date()) }
  );
  const categoryRequest = client.fetch<Category>(
    groq`*[_type == "tag" && slug == $slug] 
    { name, synonyms }[0]`,
    { slug }
  );

  const [posts, category] = await Promise.all([postsRequest, categoryRequest]);
  if (!category) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts,
      category,
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
