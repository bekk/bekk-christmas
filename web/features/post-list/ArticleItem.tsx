import { Box, BoxProps, GridItem, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import readingTime from "reading-time";
import { toDayYear } from "../../utils/date";
import { colorCombinations } from "./color-combinations";

export type ArticlePostType = {
  _type: "post";
  slug: string;
  title: string;
  plaintextContent: string;
  tags: { name: string; slug: string }[];
  availableFrom: string;
};

type ArticleItemProps = {
  post: ArticlePostType;
  index: number;
};
export const ArticleItem = ({ post, index }: ArticleItemProps) => {
  const { year, day } = toDayYear(post.availableFrom);
  return (
    <Link key={post.slug} href={`/post/${year}/${day}/${post.slug}`} passHref>
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
        maxHeight="50vh"
        overflowY="hidden"
      >
        <Text mb="24px">
          {readingTime(post.plaintextContent || "").text} –{" "}
          {post.tags.map((tag) => tag.name).join(", ")}
        </Text>
        <Heading
          as="h2"
          fontWeight="400"
          fontSize="48px"
          lineHeight="54px"
          title={post.title}
        >
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
