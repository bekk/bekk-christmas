import {
  Center,
  GridItem,
  Heading,
  ListItem,
  OrderedList,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { ArticleBackButton } from "../article/ArticleBackButton";
import { ArticlePostType } from "./ArticleItem";

type SummaryItemProps = {
  day: number;
  year: number;
  posts: ArticlePostType[];
};
export const SummaryItem = ({ day, year, posts }: SummaryItemProps) => {
  return (
    <GridItem rowSpan={2} colSpan={[1, 3]} minWidth="570px" position="relative">
      <Center
        background="brand.midGreen"
        color="white"
        flexDirection="column"
        height="100%"
        p={10}
      >
        <ArticleBackButton position="absolute" top={10} left={10} />
        <Stack>
          <Heading as="h1" fontWeight="400" mt={[10, 0]}>
            Posts for day {day}, {year}
          </Heading>
          <Text fontSize="xl">
            On the {day + getDayEnding(day)} day of Christmas, Bekk Christmas
            sent to me…
          </Text>
          <OrderedList pl={6} fontSize="xl">
            {posts.map((post) => (
              <ListItem key={post.slug}>{post.title}</ListItem>
            ))}
          </OrderedList>
          <Text fontSize="xl">Dig in!</Text>
        </Stack>
      </Center>
    </GridItem>
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
