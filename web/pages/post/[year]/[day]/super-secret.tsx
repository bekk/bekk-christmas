import { Box } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { groq } from "next-sanity";
import { ArticleItemType } from "../../../../features/post-list/ArticleItem";
import { PodcastItemType } from "../../../../features/post-list/PodcastItem";
import { PostList } from "../../../../features/post-list/PostList";
import { VideoItemType } from "../../../../features/post-list/VideoItem";
import { SiteMetadata } from "../../../../features/site-metadata/SiteMetadata";
import { toDayYear } from "../../../../utils/date";
import { getBoundedNumber } from "../../../../utils/number";
import { getClient } from "../../../../utils/sanity/sanity.server";

type PostsForDayProps = {
  posts: (ArticleItemType | VideoItemType | PodcastItemType)[];
  day: number;
  year: number;
  available: boolean;
};
export default function PostsForDay({
  posts,
  day,
  year,
  available,
}: PostsForDayProps) {
  return (
    <Box>
      <SiteMetadata
        title={`Posts for day ${day}, ${year}`}
        description="Super secret preview page"
      />
      <PostList
        posts={posts}
        heading="Preview"
        description="Here are the posts for a given day"
        backButtonHref={`/post/${year}`}
      />
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
    days.map((day) => `/post/${year}/${day}/super-secret`)
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
const LATEST_CONTENT_YEAR = 2022;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const day = getBoundedNumber(1, 24, params?.day);
  const year = getBoundedNumber(
    FIRST_CONTENT_YEAR,
    new Date().getFullYear(),
    params?.year
  );

  const isValidDay =
    day >= FIRST_DAY_OF_CHRISTMAS || day <= LAST_DAY_OF_CHRISTMAS;

  const isValidYear = year >= FIRST_CONTENT_YEAR && year <= LATEST_CONTENT_YEAR;

  if (!isValidDay || !isValidYear) {
    return { notFound: true };
  }

  const postsPublishedForDay = await getClient().fetch(
    groq`*[_type == "post" && availableFrom == $dateString] {
      "slug": slug.current, 
      _type,
      type,
      title, 
      "description": pt::text(description), 
      "plaintextContent": pt::text(content), 
      tags[]->{ name, slug },
      availableFrom,
      coverImage,
      podcastLength
      }`,
    {
      dateString: `${year}-12-${day.toString().padStart(2, "0")}`,
    }
  );

  return {
    props: {
      posts: postsPublishedForDay,
      available: true,
      day,
      year,
    },
    revalidate: 60,
  };
};
