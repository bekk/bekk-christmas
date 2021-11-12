import { Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { toDayYear } from "../../utils/date";
import { ArticlePostType } from "./ArticleItem";
import { SummaryItem } from "./SummaryItem";

type PostSummaryItemProps = {
  posts: ArticlePostType[];
};
export const PostSummaryItem = ({ posts }: PostSummaryItemProps) => {
  if (posts.length === 0) {
    return (
      <SummaryItem>
        <Stack>
          <Heading as="h1" fontWeight="400" mt={[10, 0]}>
            No posts found!
          </Heading>
          <Text fontSize="xl">We are sorry, there are no posts available.</Text>
        </Stack>
      </SummaryItem>
    );
  }
  const { day, year } = toDayYear(posts[0].availableFrom);
  return (
    <SummaryItem>
      <Stack>
        <Heading as="h1" fontWeight="400" mt={[10, 0]}>
          Posts for day {day}, {year}
        </Heading>
      </Stack>
    </SummaryItem>
  );
};
