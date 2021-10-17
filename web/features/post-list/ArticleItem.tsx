import { Box, BoxProps, GridItem, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import readingTime from "reading-time";
import { colorCombinations } from "./color-combinations";

export type ArticlePostType = {
  _id: string;
  _type: "post";
  title: string;
  plaintextContent: string;
  tags: { name: string; slug: string }[];
};

type ArticleItemProps = {
  post: ArticlePostType;
  year: number;
  day: number;
  index: number;
};
export const ArticleItem = ({ post, year, day, index }: ArticleItemProps) => {
  return (
    <Link key={post._id} href={`/post/${year}/${day}/${post._id}`} passHref>
      <GridItem
        as="a"
        backgroundColor={
          colorCombinations[index % colorCombinations.length].background
        }
        color={colorCombinations[index % colorCombinations.length].foreground}
        p={10}
        pb={6}
        position="relative"
        minWidth={["100%", "368px"]}
      >
        <Text mb="24px">
          {readingTime(post.plaintextContent || "").text} –{" "}
          {post.tags.map((tag) => tag.name).join(", ")}
        </Text>
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
