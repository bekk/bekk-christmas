import { Box } from "@chakra-ui/react";
import React from "react";

type IframeSlideProps = { url: string };
export const IframeSlide = ({ url }: IframeSlideProps) => {
  return <Box as="iframe" minHeight="100vh" src={url} width="100vw" />;
};
