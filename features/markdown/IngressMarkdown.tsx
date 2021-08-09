import { Code } from "@chakra-ui/react";
import * as React from "react";
import ReactMarkdown from "react-markdown";
import { ReactMarkdownProps } from "react-markdown/src/ast-to-react";
import emojiSupport from "remark-emoji";
import githubFlavoredMarkdownSupport from "remark-gfm";
import { TextLink } from "../design-system/TextLink";

type IngressMarkdownProps = {
  /** Unparsed markdown */
  children: string;
};
/** Renders simplified excerpt markdown */
export const IngressMarkdown = ({ children }: IngressMarkdownProps) => {
  return (
    <ReactMarkdown
      components={markdownComponents}
      plugins={[emojiSupport, githubFlavoredMarkdownSupport]}
    >
      {children}
    </ReactMarkdown>
  );
};

const markdownComponents = {
  a: ({ href, children }: ReactMarkdownProps & { href: string }) => (
    <TextLink href={href}>{children}</TextLink>
  ),
  code: ({ inline, children }: ReactMarkdownProps & { inline: boolean; className: string }) => {
    if (inline) {
      return <Code>{children}</Code>;
    }
    return null; // Not supported
  },
};
