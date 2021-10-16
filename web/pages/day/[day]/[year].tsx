import {
  Box,
  BoxProps,
  Center,
  Grid,
  GridItem,
  Heading,
  ListItem,
  OrderedList,
  Stack,
  Text,
} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { groq } from "next-sanity";
import Link from "next/link";
import React from "react";
import readingTime from "reading-time";
import { ArticleBackButton } from "../../../features/article/ArticleBackButton";
import { SiteMetadata } from "../../../features/layout/SiteMetadata";
import { toPlainText } from "../../../utils/sanity/sanity.client";
import { getClient } from "../../../utils/sanity/sanity.server";
import { colorCombinations } from "../../../utils/theme";

type PostsForDayProps = {
  posts: any[];
  day: number;
  year: number;
};
export default function PostsForDay({ posts, day, year }: PostsForDayProps) {
  // TODO: Add illustrations

  return (
    <Box>
      <SiteMetadata
        title={`Posts for day ${day}, ${year}`}
        description={`Check out all ${posts.length} posts from Bekk on day ${day} of the ${year} Christmas season`}
      />
      <Grid
        overflowX={["scroll"]}
        gridAutoFlow={["row", "column"]}
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(6, 1fr)"
        height="100vh"
      >
        <GridItem rowSpan={2} colSpan={3} minWidth="570px" position="relative">
          <Center
            background="brand.midGreen"
            color="white"
            flexDirection="column"
            height="100%"
            p={10}
          >
            <ArticleBackButton position="absolute" top={10} left={10} />
            <Stack>
              <Heading as="h1" fontWeight="400">
                Posts for day {day}, {year}
              </Heading>
              <Text fontSize="xl">
                On the {day + getDayEnding(day)} day of Christmas, Bekk
                Christmas sent to me…
              </Text>
              <OrderedList pl={6} fontSize="xl">
                {posts.map((post) => (
                  <ListItem key={post._id}>{post.title}</ListItem>
                ))}
                <ListItem fontWeight="bold">golden riiiiiings</ListItem>
              </OrderedList>
              <Text fontSize="xl">Dig in!</Text>
            </Stack>
          </Center>
        </GridItem>
        {posts.map((post, index) => (
          <ArticleGridItem key={post._id} post={post} index={index} />
        ))}
      </Grid>
    </Box>
  );
}

const ArticleGridItem = ({ post, index }) => {
  return (
    <Link key={post._id} href={`/post/${post._id}`} passHref>
      <GridItem
        as="a"
        backgroundColor={
          colorCombinations[index % colorCombinations.length].background
        }
        color={colorCombinations[index % colorCombinations.length].foreground}
        p={10}
        pb={6}
        position="relative"
        minWidth="368px"
      >
        <Text mb="24px">{readingTime(toPlainText(post.content)).text}</Text>
        <Heading as="h2" fontWeight="400" fontSize="48px" lineHeight="54px">
          {post.title}
        </Heading>
        <ArrowIcon
          position="absolute"
          bottom="24px"
          right="24px"
          width="24px"
          height="16px"
        />
      </GridItem>
    </Link>
  );
};

const ArrowIcon = (props: BoxProps) => {
  return (
    <Box as="svg" viewBox="0 0 24 16" {...props}>
      <path
        d="m16.25 0-.68.69 6.58 6.57H0v.97h22.15l-6.58 6.58.68.69L24 7.75 16.25 0Z"
        fill="currentColor"
      />
    </Box>
  );
};

const getDayEnding = (day: number) => {
  switch (day) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const days = Array(24)
    .fill(0)
    .map((_, i) => i + 1);

  type Post = { availableFrom: string };
  const allPosts = await getClient().fetch<Post[]>(
    groq`*[_type == "post"] { availableFrom }`
  );

  const uniqueYears = [
    ...new Set(
      allPosts.map((post) => new Date(post.availableFrom).getFullYear())
    ),
  ];

  const paths = uniqueYears.flatMap((year) =>
    days.map((day) => `/day/${year}/${day}`)
  );

  return {
    paths,
    fallback: "blocking",
  };
};

const FIRST_DAY_OF_CHRISTMAS = 1;
const LAST_DAY_OF_CHRISTMAS = 24;
const FIRST_CONTENT_YEAR = 2016;
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

  const beginningOfDay = new Date(year, 11, day);
  const endOfDay = new Date(year, 11, day, 23, 59, 59);

  const postsPublishedForDay = await getClient().fetch(
    groq`*[_type == "post" && availableFrom >= $beginningOfDay && availableFrom < $endOfDay]`,
    { beginningOfDay, endOfDay }
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
