import { Box } from "@chakra-ui/layout";
import React from "react";

export const AnchorFmPodcastBlock = ({ node }: any) => {
  return <Box as="iframe" src={node.src} frameBorder="0" scrolling="no" />;
};
