import { Heading, Text } from "@chakra-ui/react";
import React from "react";

export const BlockBlock = ({ node, children }: any) => {
  if (/^h\d/.test(node.style)) {
    const fontSizes = {
      h1: "4xl",
      h2: "3xl",
      h3: "2xl",
      h4: "xl",
      h5: "lg",
      h6: "md",
    };
    return (
      <Heading
        as={node.style}
        fontSize={fontSizes[node.style as keyof typeof fontSizes]}
        pt={"1.5em"}
      >
        {children}
      </Heading>
    );
  }
  return <Text>{children}</Text>;
};
