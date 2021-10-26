import { Text } from "@chakra-ui/react";
import React from "react";

export const BlockQuoteBlock = ({ children }: any) => {
  return (
    <Text
      as="blockquote"
      my={["40px", "80px"]}
      ml={[0, 0, "120px"]}
      pl="16px"
      borderLeft="3px solid"
      borderColor="brand.darkGreen"
      fontSize="24"
      fontFamily="body"
      fontWeight="300"
      fontStyle="italic"
    >
      &quot;{children}&quot;
    </Text>
  );
};
