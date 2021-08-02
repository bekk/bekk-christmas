import {
  Box,
  Code,
  Heading,
  Image,
  ListItem,
  OrderedList,
  Skeleton,
  Table,
  Td,
  Text,
  Tr,
  UnorderedList,
} from "@chakra-ui/react";
import * as React from "react";
import ReactMarkdown from "react-markdown";
import { ReactMarkdownProps } from "react-markdown/src/ast-to-react";
import rawHtmlSupport from "rehype-raw";
import emojiSupport from "remark-emoji";
import githubFlavoredMarkdownSupport from "remark-gfm";
import { BlockQuote } from "../design-system/BlockQuote";
import { HorizontalRule } from "../design-system/HorizontalRule";
import { ResponsiveIframe } from "../design-system/ResponsiveIframe";
import { SyntaxHighlighter } from "../design-system/SyntaxHighlighter";
import { TextLink } from "../design-system/TextLink";

type MarkdownProps = {
  /** Unparsed markdown */
  children: string;
};
/** Renders markdown with the correct design for articles */
export const ArticleMarkdown = ({ children }: MarkdownProps) => {
  return (
    <ReactMarkdown
      components={markdownComponents}
      plugins={[emojiSupport, githubFlavoredMarkdownSupport]}
      rehypePlugins={[rawHtmlSupport]}
    >
      {children}
    </ReactMarkdown>
  );
};

// These are the two different widths of content we provide today
const wideProps = { mx: "auto", mt: 3, maxWidth: "container.lg" };
const mediumProps = { mx: "auto", mt: 3, maxWidth: "container.md" };
const narrowProps = { mx: "auto", mt: 3, px: 3, maxWidth: "container.sm" };

// Here are all the components that create the different HTML elements from
// Markdown. If you want to tweak the design of articles, this is probably
// where you want to look.
const markdownComponents = {
  a: ({ href, children }: ReactMarkdownProps & { href: string }) => (
    <TextLink href={href}>{children}</TextLink>
  ),
  blockquote: ({ children }: ReactMarkdownProps) => (
    <BlockQuote {...narrowProps}>{children}</BlockQuote>
  ),
  code: ({
    inline,
    className,
    children,
  }: ReactMarkdownProps & { inline: boolean; className: string }) => {
    if (inline) {
      return <Code>{children}</Code>;
    }
    return (
      <Box {...mediumProps}>
        <SyntaxHighlighter language={className}>{children}</SyntaxHighlighter>
      </Box>
    );
  },
  h1: ({ children }: ReactMarkdownProps) => (
    <Heading as="h1" fontSize="4xl" {...narrowProps} mt={6}>
      {children}
    </Heading>
  ),
  h2: ({ children }: ReactMarkdownProps) => (
    <Heading as="h2" fontSize="3xl" {...narrowProps} mt={6}>
      {children}
    </Heading>
  ),
  h3: ({ children }: ReactMarkdownProps) => (
    <Heading as="h3" fontSize="2xl" {...narrowProps} mt={6}>
      {children}
    </Heading>
  ),
  h4: ({ children }: ReactMarkdownProps) => (
    <Heading as="h4" fontSize="xl" {...narrowProps} mt={6}>
      {children}
    </Heading>
  ),
  h5: ({ children }: ReactMarkdownProps) => (
    <Heading as="h5" fontSize="lg" {...narrowProps} mt={6}>
      {children}
    </Heading>
  ),
  h6: ({ children }: ReactMarkdownProps) => (
    <Heading as="h6" {...narrowProps} mt={6}>
      {children}
    </Heading>
  ),
  hr: () => <HorizontalRule {...narrowProps} />,
  img: ({ src, alt }: any) => (
    <Image
      src={src}
      alt={alt}
      width="100%"
      {...wideProps}
      my={12}
      fallback={<Skeleton width="100%" height="300px" />}
    />
  ),
  p: ({ children, node }: ReactMarkdownProps) => {
    // The Markdown spec specifies that all standalone images should be wrapped
    // in a paragraph. However, we want images to be wider than paragraphs.
    // Here, if we find a paragraph tag with an image in it,
    // we just render the image directly
    if (node.children.some((child) => child.tagName === "img")) {
      return children;
    }
    return (
      <Text
        {...narrowProps}
        lineHeight="1.65"
        fontFamily="FFDINWebProLight, sans-serif"
      >
        {children}
      </Text>
    );
  },
  li: ({ children }: ReactMarkdownProps) => <ListItem>{children}</ListItem>,
  ol: ({ children }: ReactMarkdownProps) => (
    <OrderedList {...narrowProps} pl={8}>
      {children}
    </OrderedList>
  ),
  ul: ({ children }: ReactMarkdownProps) => (
    <UnorderedList {...narrowProps} pl={8}>
      {children}
    </UnorderedList>
  ),
  table: ({ children }: ReactMarkdownProps) => (
    <Table {...wideProps}>{children}</Table>
  ),
  tr: ({ children, isHeader }: ReactMarkdownProps & { isHeader: boolean }) => (
    <Tr borderBottom="solid gray.500" borderBottomWidth={isHeader ? 3 : 1}>
      {children}
    </Tr>
  ),
  th: ({ children }: ReactMarkdownProps & { isHeader: boolean }) => (
    <Td as="th">{children}</Td>
  ),
  td: ({ children }: ReactMarkdownProps & { isHeader: boolean }) => (
    <Td>{children}</Td>
  ),
  iframe: ({
    children,
    node,
    ...rest
  }: ReactMarkdownProps & {
    width: number;
    height: number;
    src: string;
    allowFullScreen?: string;
  }) => (
    <Box {...wideProps}>
      <ResponsiveIframe {...rest} />
    </Box>
  ),
};
