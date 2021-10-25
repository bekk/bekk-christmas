import { Box, Container } from "@chakra-ui/react";
import React from "react";
import { ArticleBackButton } from "./ArticleBackButton";

export const ArticleHeader = () => {
  return (
    <Box as="header" background="brand.pink" minHeight="10vh">
      <Container maxWidth="container.md" padding="2.5rem">
        <ArticleBackButton />
      </Container>
    </Box>
  );
};
