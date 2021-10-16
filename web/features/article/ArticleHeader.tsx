import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { ArticleBackButton } from "./ArticleBackButton";

type ArticleHeaderProps = {
  title: string;
  category: string;
  readingTime?: string;
};

export const ArticleHeader = ({
  title,
  category,
  readingTime,
}: ArticleHeaderProps) => {
  return (
    <Box
      as="header"
      background="brand.darkGreen"
      color="brand.pink"
      minHeight="33vh"
    >
      <Container maxWidth="container.md" padding="2.5rem">
        <Flex mb={10}>
          <ArticleBackButton />
          <Box flex="1" fontSize="24px" ml="4" color="white">
            {category ?? "Uncategorized"}
          </Box>
        </Flex>
        {readingTime && <Box>{readingTime}</Box>}
        <Heading as="h1" fontSize="56px" lineHeight="66px" fontWeight="400">
          {title ?? "No title yet"}
        </Heading>
      </Container>
    </Box>
  );
};
