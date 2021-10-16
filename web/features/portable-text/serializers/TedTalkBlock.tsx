import { Box } from "@chakra-ui/layout";
import React from "react";

export const TedTalkBlock = ({ node }: any) => {
  return (
    <Box maxWidth="854px">
      <Box position="relative" height="0" pb="56.25%">
        <Box
          as="iframe"
          src={node.src}
          width="854"
          height="480"
          position="absolute"
          left="0"
          top="0"
          style={{ width: "100%", height: "100%" }}
          frameBorder="0"
          scrolling="no"
          allowFullScreen
        />
      </Box>
    </Box>
  );
};
