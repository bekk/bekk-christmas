import { Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { toDayYear } from "../../utils/date";
import { ArticlePostType } from "./ArticleItem";

type PostSummaryItemProps = {
  posts: ArticlePostType[];
};
export const PostSummaryItem = ({ posts }: PostSummaryItemProps) => {
  if (posts.length === 0) {
    return (
      <Stack>
        <Heading as="h1" fontWeight="400" mt={[10, 0]}>
          No posts found!
        </Heading>
        <Text fontSize="xl">We are sorry, there are no posts available.</Text>
      </Stack>
    );
  }
  const { day } = toDayYear(posts[0].availableFrom);
  return (
    <Heading as="h1" fontWeight="400" fontSize="5rem" mt={[10, 0]}>
      {day}-Dec
    </Heading>
  );
};
