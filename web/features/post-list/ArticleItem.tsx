import { Box, BoxProps, GridItem, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
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

const MotionGridItem = motion(GridItem);

export const ArticleItem = ({ post, index }: ArticleItemProps) => {
  const { year, day } = toDayYear(post.availableFrom);
  return (
    <Link href={`/post/${year}/${day}/${post.slug}`} passHref>
      <MotionGridItem
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
        _focus={{ transform: "scale(1.1)", zIndex: 100, outline: "none" }}
        transition=".1s ease-out"
      >
        <motion.div
          whileHover={{ scale: 1.04, skew: 0.9, zIndex: 100, outline: "none" }}
          whileTap={{ scale: 0.9, zIndex: 100, outline: "none" }}
          style={{ height: "100%" }}
          transition={{ duration: 1}}
        >
          <Text mb="24px">
            {readingTime(post.plaintextContent || "").text} –{" "}
            {post.tags?.map((tag) => tag.name).join(", ")}
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
        </motion.div>

        <ArrowIcon
          position="absolute"
          bottom="24px"
          right="24px"
          width="24px"
          height="16px"
        />
      </MotionGridItem>
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
