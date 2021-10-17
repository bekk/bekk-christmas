import { Heading, ListItem, OrderedList, Stack, Text } from "@chakra-ui/react";
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
