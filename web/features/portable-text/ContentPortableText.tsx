import { Code, GridItem, ListItem, UnorderedList } from "@chakra-ui/react";
import { createPortableTextComponent } from "next-sanity";
import React from "react";
import { sanityConfig } from "../../utils/sanity/config";
import { TextLink } from "../design-system/TextLink";
import { BlockQuoteBlock } from "./serializers/BlockQuoteBlock";
import { CodeBlock } from "./serializers/CodeBlock";
import { CodePenBlock } from "./serializers/CodePenBlock";
import { CodeSandboxBlock } from "./serializers/CodeSandboxBlock";
import { HeadingBlock } from "./serializers/HeadingBlock";
import { IframeBlock } from "./serializers/IframeBlock";
import { ImageBlock } from "./serializers/ImageBlock";
import { TextBlock } from "./serializers/TextBlock";
import { TwitterBlock } from "./serializers/TwitterBlock";
import { UnfurledUrlBlock } from "./serializers/UnfurledUrlBlock";
import { YouTubeBlock } from "./serializers/YouTubeBlock";

const withWrap =
  (
    maxWidth: "wide" | "default" = "default",
    spaceAbove: number = 16,
    spaceBelow: number = 16,
    indent: number = 240
  ) =>
  (Component: React.FunctionComponent) =>
  (props: any) =>
    (
      <GridItem
        marginLeft={[0, 0, `${indent}px`]}
        marginTop={`${spaceAbove}px`}
        marginBottom={`${spaceBelow}px`}
        maxWidth={maxWidth === "wide" ? "80ch" : "60ch"}
        px={maxWidth === "wide" ? "0" : "2.5rem"}
      >
        <Component {...props} />
      </GridItem>
    );

const withSpacing = (block) => withWrap("wide", 32, 32)(block);

const serializers = {
  types: {
    authorReference: ({ node }: any) => <span>{node.author.name}</span>,
    block: (props: any) => {
      if (props.node.style === "blockquote") {
        return withSpacing(BlockQuoteBlock)(props);
      }
      if (/^h\d/.test(props.node.style)) {
        return withWrap("wide", 80)(HeadingBlock)(props);
      }
      return withWrap("wide")(TextBlock)(props);
    },
    code: withSpacing(CodeBlock),
    codeSandbox: withSpacing(CodeSandboxBlock),
    codePen: withSpacing(CodePenBlock),
    youtube: withSpacing(YouTubeBlock),
    twitter: withSpacing(TwitterBlock),
    unfurledUrl: withSpacing(UnfurledUrlBlock),
    mainImage: withWrap("wide", 80, 80, 120)(ImageBlock),
    iframe: withSpacing(IframeBlock),
    image: withWrap("wide", 80, 80, 120)(ImageBlock),
    imageWithMetadata: withWrap("wide", 80, 80, 120)(ImageBlock),
    __block: ({ node }) => {
      if (node.block?._type === "image") {
        return <ImageBlock node={node} />;
      }
      if (node.block?._type === "code") {
        return <CodeBlock node={node} />;
      }
      console.log("unhandled __block found", node);
      return null;
    },
  },
  marks: {
    link: (props: any) => (
      <TextLink href={props.mark.href}>{props.children}</TextLink>
    ),
    code: Code,
  },
  list: withWrap("default")((props) => (
    <UnorderedList fontSize="lg">{props.children}</UnorderedList>
  )),
  listItem: (props: any) => <ListItem>{props.children}</ListItem>,
  container: (props: any) => <>{props.children}</>,
};

export const ContentPortableText = createPortableTextComponent({
  ...sanityConfig,
  serializers: serializers,
});
