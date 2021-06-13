import { Box, Code, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import ReactSyntaxHighlighter from "react-syntax-highlighter";
import {
  a11yDark,
  a11yLight,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";

type SyntaxHighlighterProps = {
  /** The language to highlight */
  language: string;
  /** The code to highlight */
  children: React.ReactNode;
};
export const SyntaxHighlighter = ({
  language,
  children,
}: SyntaxHighlighterProps) => {
  const theme = useColorModeValue(a11yLight, a11yDark);
  const strippedLanguage = language?.startsWith("language-")
    ? language.split("language-")[1]
    : language;
  return (
    <ReactSyntaxHighlighter
      language={strippedLanguage}
      PreTag={(props: any) => <Box as="pre" {...props} />}
      CodeTag={Code}
      styles={theme}
    >
      {children}
    </ReactSyntaxHighlighter>
  );
};
