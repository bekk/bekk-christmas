import { Flex } from "@chakra-ui/react";
import React from "react";

type ArticleContainerProps = { children: React.ReactNode };
export const ArticleContainer = ({ children }: ArticleContainerProps) => (
  <Flex minHeight="100vh" flexDirection="column">
    {children}
  </Flex>
);
