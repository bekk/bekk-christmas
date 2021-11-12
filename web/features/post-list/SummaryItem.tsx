import { Center, GridItem } from "@chakra-ui/react";
import React from "react";
import { ArticleBackButton } from "../article/ArticleBackButton";

type SummaryItemProps = {
  children: React.ReactNode;
};
export const SummaryItem = ({ children }: SummaryItemProps) => (
  <GridItem
    rowSpan={2}
    minWidth={["100%", "552px"]}
    width="100%"
    position="relative"
  >
    <Center
      background="brand.midGreen"
      color="white"
      flexDirection="column"
      height="100%"
      p={10}
    >
      <ArticleBackButton position="absolute" top={10} left={10} />
      {children}
    </Center>
  </GridItem>
);
