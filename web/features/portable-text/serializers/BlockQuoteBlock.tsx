import { Text } from "@chakra-ui/react";
import React from "react";

export const BlockQuoteBlock = ({ children }: any) => {
  return (
    <Text
      as="blockquote"
      pl="16px"
      borderLeft="3px solid"
      borderColor="brand.darkGreen"
      fontSize="24"
      fontWeight="300"
      fontStyle="italic"
    >
      &quot;{children}&quot;
    </Text>
  );
};
