import { Flex, Container } from "@chakra-ui/react";
import React from "react";
import { ArticleBackButton } from "./ArticleBackButton";

export const ArticleHeader = () => {
  return (
    <Flex
      as="header"
      background="brand.pink"
      minHeight="15vh"
      alignItems="center"
    >
      <Container maxWidth="container.lg">
        <ArticleBackButton />
      </Container>
    </Flex>
  );
};
