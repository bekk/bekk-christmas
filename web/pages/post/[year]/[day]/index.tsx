import { Box } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { groq } from "next-sanity";
import React from "react";
import { SiteMetadata } from "../../../../features/layout/SiteMetadata";
import { ArticlePostType } from "../../../../features/post-list/ArticleItem";
import { PostList } from "../../../../features/post-list/PostList";
import { PostSummaryItem } from "../../../../features/post-list/PostSummaryItem";
import { toDayYear } from "../../../../utils/date";
import { getClient } from "../../../../utils/sanity/sanity.server";

type PostsForDayProps = {
  posts: ArticlePostType[];
  day: number;
  year: number;
};
export default function PostsForDay({ posts, day, year }: PostsForDayProps) {
  return (
    <Box>
      <SiteMetadata
        title={`Posts for day ${day}, ${year}`}
        description={`Check out all ${posts.length} posts from Bekk on day ${day} of the ${year} Christmas season`}
      />
      <PostList posts={posts}>
        <PostSummaryItem posts={posts} />
      </PostList>
    </Box>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const days = Array(24)
    .fill(0)
    .map((_, i) => i + 1);

  type Post = { availableFrom: string };
  const allPosts = await getClient().fetch<Post[]>(
    groq`*[_type == "post"] { availableFrom }`
  );

  const uniqueYears = [
    ...new Set(allPosts.map((post) => toDayYear(post.availableFrom).year)),
  ];

  const paths = uniqueYears.flatMap((year) =>
    days.map((day) => `/post/${year}/${day}`)
  );

  return {
    paths,
    fallback: "blocking",
  };
};

const FIRST_DAY_OF_CHRISTMAS = 1;
const LAST_DAY_OF_CHRISTMAS = 24;
const FIRST_CONTENT_YEAR = 2016;
// TODO: This should probably be calculated from the latest post
const LATEST_CONTENT_YEAR = 2021;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const day = Number(params?.day);
  const isValidDay =
    day >= FIRST_DAY_OF_CHRISTMAS || day <= LAST_DAY_OF_CHRISTMAS;
  const year = Number(params?.year);
  const isValidYear = year >= FIRST_CONTENT_YEAR && year <= LATEST_CONTENT_YEAR;

  if (!isValidDay || !isValidYear) {
    return { notFound: true };
  }

  const postsPublishedForDay = await getClient().fetch(
    groq`*[_type == "post" 
    && availableFrom >= $beginningOfDay 
    && availableFrom < $endOfDay] {
      "slug": slug.current, 
      _type,
      title, 
      "plaintextContent": pt::text(content), 
      tags[]->{ name, slug },
      availableFrom
      }`,
    {
      beginningOfDay: toDateString(year, day),
      endOfDay: toDateString(year, day + 1),
    }
  );

  return {
    props: {
      posts: postsPublishedForDay,
      day,
      year,
    },
    revalidate: 60,
  };
};

const toDateString = (year: number, day: number) =>
  `${year}-12-${day.toString().padStart(2, "0")}`;
