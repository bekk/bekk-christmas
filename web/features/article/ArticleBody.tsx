import { Box, Container, Text } from "@chakra-ui/react";
import React from "react";
import { PortableText } from "../portable-text/PortableText";

type ArticleBodyProps = {
  description?: string;
  authors?: { fullName: string }[];
  publishedAt?: string;
  content: unknown;
};
export const ArticleBody = ({
  description,
  content,
  authors,
  publishedAt,
}: ArticleBodyProps) => {
  return (
    <Box backgroundColor="brand.pink" color="brand.darkGreen" flex="1" py="6">
      <Container maxWidth="container.md" px="2.5rem">
        {description && (
          <Box fontSize="2xl" mb="4">
            {description}
          </Box>
        )}
        {authors && (
          <strong>
            {authors.map((author) => author.fullName).join(", ") ??
              "No authors"}
          </strong>
        )}
        {authors && publishedAt && " – "}
        {publishedAt}
      </Container>
      <Container maxWidth="container.md" mt="4" px={0} fontSize="xl">
        {content ? <PortableText blocks={content} /> : <Text>No content</Text>}
      </Container>
    </Box>
  );
};
