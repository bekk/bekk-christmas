import { Box, BoxProps, Flex } from "@chakra-ui/react";
import * as React from "react";

/** A pretty horizontal rule component, consisting of three dots */
export const HorizontalRule = (props: BoxProps) => {
  return (
    <Flex {...props} justifyContent="center" alignItems="center">
      <Box width="0.3em" height="0.3em" borderRadius="50%" bg="gray.500" />
      <Box
        width="0.5em"
        height="0.5em"
        borderRadius="50%"
        bg="gray.500"
        mx={6}
      />
      <Box width="0.3em" height="0.3em" borderRadius="50%" bg="gray.500" />
    </Flex>
  );
};
