import { Box } from "@chakra-ui/react";
import React from "react";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import clojure from "react-syntax-highlighter/dist/cjs/languages/prism/clojure";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import elm from "react-syntax-highlighter/dist/cjs/languages/prism/elm";
import fsharp from "react-syntax-highlighter/dist/cjs/languages/prism/fsharp";
import haskell from "react-syntax-highlighter/dist/cjs/languages/prism/haskell";
import java from "react-syntax-highlighter/dist/cjs/languages/prism/java";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx";
import kotlin from "react-syntax-highlighter/dist/cjs/languages/prism/kotlin";
import less from "react-syntax-highlighter/dist/cjs/languages/prism/less";
import html from "react-syntax-highlighter/dist/cjs/languages/prism/markup";
import rust from "react-syntax-highlighter/dist/cjs/languages/prism/rust";
import scala from "react-syntax-highlighter/dist/cjs/languages/prism/scala";
import swift from "react-syntax-highlighter/dist/cjs/languages/prism/swift"
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import prism from "react-syntax-highlighter/dist/cjs/styles/prism/prism";

SyntaxHighlighter.registerLanguage("html", html);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("less", less);
SyntaxHighlighter.registerLanguage("js", jsx);
SyntaxHighlighter.registerLanguage("javascript", jsx);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("ts", tsx);
SyntaxHighlighter.registerLanguage("typescript", tsx);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("elm", elm);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("sh", bash);
SyntaxHighlighter.registerLanguage("kotlin", kotlin);
SyntaxHighlighter.registerLanguage("java", java);
SyntaxHighlighter.registerLanguage("haskell", haskell);
SyntaxHighlighter.registerLanguage("scala", scala);
SyntaxHighlighter.registerLanguage("clojure", clojure);
SyntaxHighlighter.registerLanguage("fsharp", fsharp);
SyntaxHighlighter.registerLanguage("rust", rust);
SyntaxHighlighter.registerLanguage("swift", swift);

export const CodeBlock = ({ node }: any) => {
  if (!node?.code) {
    return null;
  }
  const { language = "text", code } = node;
  return (
    <Box fontSize="sm">
      <SyntaxHighlighter style={prism} language={language}>
        {code}
      </SyntaxHighlighter>
    </Box>
  );
};
