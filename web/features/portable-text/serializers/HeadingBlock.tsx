import React from "react";
import { Heading } from "@chakra-ui/react";

export const HeadingBlock = ({ node, children }: any) => {
  const fontSizes = {
    h1: "3xl",
    h2: "2xl",
    h3: "xl",
    h4: "lg",
    h5: "md",
    h6: "sm",
  };
  return (
    <Heading
      as={node.style}
      size={fontSizes[node.style as keyof typeof fontSizes]}
      pt="1.5em"
      fontWeight="normal"
      paddingTop={0}
    >
      {children}
    </Heading>
  );
};
