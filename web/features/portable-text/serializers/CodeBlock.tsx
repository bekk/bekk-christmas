import { Box } from "@chakra-ui/react";
import React from "react";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import elm from "react-syntax-highlighter/dist/cjs/languages/prism/elm";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx";
import html from "react-syntax-highlighter/dist/cjs/languages/prism/markup";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import prism from "react-syntax-highlighter/dist/cjs/styles/prism/prism";

SyntaxHighlighter.registerLanguage("html", html);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("elm", elm);
SyntaxHighlighter.registerLanguage("bash", bash);

export const CodeBlock = ({ node }: any) => {
  if (!node?.code) {
    return null;
  }
  const { language, code } = node;
  return (
    <Box boxShadow="lg" my="3rem">
      <SyntaxHighlighter style={prism} language={language}>
        {code}
      </SyntaxHighlighter>
    </Box>
  );
};
