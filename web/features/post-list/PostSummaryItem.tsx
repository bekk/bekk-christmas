import { Heading, ListItem, OrderedList, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { ArticlePostType } from "./ArticleItem";
import { SummaryItem } from "./SummaryItem";

type PostSummaryItemProps = {
  day: number;
  year: number;
  posts: ArticlePostType[];
};
export const PostSummaryItem = ({ day, year, posts }: PostSummaryItemProps) => {
  return (
    <SummaryItem>
      <Stack>
        <Heading as="h1" fontWeight="400" mt={[10, 0]}>
          Posts for day {day}, {year}
        </Heading>
        <Text fontSize="xl">
          On the {day + getDayEnding(day)} day of Christmas, Bekk Christmas sent
          to me…
        </Text>
        <OrderedList pl={6} fontSize="xl">
          {posts.map((post) => (
            <ListItem key={post.slug}>{post.title}</ListItem>
          ))}
        </OrderedList>
        <Text fontSize="xl">Dig in!</Text>
      </Stack>
    </SummaryItem>
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
