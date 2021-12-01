import { Box } from "@chakra-ui/layout";
import React from "react";

type AnchorFmPodcastBlockProps = { node: { src: string } };
export const AnchorFmPodcastBlock = ({ node }: AnchorFmPodcastBlockProps) => {
  return <Box as="iframe" src={node.src} frameBorder="0" scrolling="no" width="100%" />;
};
