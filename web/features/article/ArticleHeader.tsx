import { Container, Flex } from "@chakra-ui/react";
import React from "react";
import { ArticleBackButton } from "./ArticleBackButton";

export const ArticleHeader = () => {
  return (
    <Flex as="header" minHeight="15vh" alignItems="center">
      <Container maxWidth="container.lg">
        <ArticleBackButton />
      </Container>
    </Flex>
  );
};
