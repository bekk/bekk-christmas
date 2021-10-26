import { Box, Flex, Heading, Container, Text } from "@chakra-ui/react";
import React from "react";
import { PortableText } from "../portable-text/PortableText";
import { Space } from "../design-system/Space";

type ArticleBodyProps = {
  title: string;
  category: string;
  readingTime?: string;
  description?: string;
  authors?: { fullName: string }[];
  publishedAt?: string;
  content: unknown;
};
export const ArticleBody = ({
  title,
  category,
  readingTime,
  description,
  content,
  authors,
  publishedAt,
}: ArticleBodyProps) => {
  return (
    <Container
      backgroundColor="white"
      color="brand.midGrey"
      margin="120px auto 80px"
      maxWidth="container.lg"
    >
      <Box marginBottom={20}>
        {category && (
          <Box fontSize={"lg"} marginBottom={4}>
            {category}
          </Box>
        )}
        <Heading
          as={"h1"}
          size={"4xl"}
          fontWeight="normal"
          lineHeight="1.15"
          color="brand.darkGrey"
        >
          {title}
        </Heading>
      </Box>
      <Box marginLeft={60} marginBottom={20} color="brand.darkGrey">
        <Flex>
          <Text>{readingTime}</Text>
          <Text px={2}>-</Text>
          <Text>
            {authors
              ? "Written by " +
                authors.map((author) => author.fullName).join(", ")
              : "No authors"}
          </Text>
          {authors && publishedAt && <Text px={2}>-</Text>}
          {publishedAt}
        </Flex>
        {description && (
          <>
            <Space />
            <Box fontSize="2xl">{description}</Box>
          </>
        )}
      </Box>
      {content ? <PortableText blocks={content} /> : <Text>No content</Text>}
    </Container>
  );
};
