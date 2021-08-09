import { Text, TextProps } from "@chakra-ui/react";
import * as React from "react";

type BlockQuoteProps = TextProps & {
  children: React.ReactNode;
};
/** Make pretty block quotes */
export const BlockQuote = (props: BlockQuoteProps) => (
  <Text as="blockquote" fontSize="2xl" textAlign="center" textStyle="italic" py={6} {...props} />
);
