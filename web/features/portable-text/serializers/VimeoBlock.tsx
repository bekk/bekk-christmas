import { Box } from "@chakra-ui/react";
import React from "react";

type VimeoBlockProps = { node: { src: string } };
export const VimeoBlock = ({ node }: VimeoBlockProps) => {
  return (
    <Box maxWidth="854px">
      <Box position="relative" height="0" pb="56.25%">
        <Box
          as="iframe"
          src={node.src}
          maxWidth="100%"
          width="640"
          height="321"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </Box>
    </Box>
  );
};
