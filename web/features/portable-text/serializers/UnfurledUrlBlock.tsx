import { Box } from "@chakra-ui/react";
import { PreviewLink } from "@opengraphninja/react";
import "@opengraphninja/react/styles.css";
import React from "react";

export const UnfurledUrlBlock = ({ node }: any) => {
  if (!node || !node.url) {
    return null;
  }
  return (
    <Box>
      <PreviewLink href={node.url} />
    </Box>
  );
};
