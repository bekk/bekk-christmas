import {
  Box,
  Code,
  ListItem,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
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
    spaceAbove: number = 16,
    spaceBelow: number = 16,
    fullWidth: boolean = false
  ) =>
  (Component: React.FunctionComponent) =>
  (props: any) =>
    (
      <Box
        margin={`${spaceAbove}px auto ${spaceBelow}px`}
        maxWidth={fullWidth ? "100%" : "80ch"}
      >
        <Component {...props} />
      </Box>
    );

const withExtraSpacing = (block) => withWrap(40, 40)(block);

const serializers = {
  types: {
    authorReference: ({ node }: any) => <span>{node.author.name}</span>,
    block: (props: any) => {
      if (props.node.style === "blockquote") {
        return withExtraSpacing(BlockQuoteBlock)(props);
      }
      if (/^h\d/.test(props.node.style)) {
        return withWrap(40)(HeadingBlock)(props);
      }
      return withWrap()(TextBlock)(props);
    },
    code: withExtraSpacing(CodeBlock),
    codeSandbox: withExtraSpacing(CodeSandboxBlock),
    codePen: withExtraSpacing(CodePenBlock),
    youtube: withExtraSpacing(YouTubeBlock),
    twitter: withExtraSpacing(TwitterBlock),
    unfurledUrl: withExtraSpacing(UnfurledUrlBlock),
    mainImage: withWrap(40, 40, true)(ImageBlock),
    iframe: withExtraSpacing(IframeBlock),
    image: withWrap(40, 40, true)(ImageBlock),
    imageWithMetadata: withWrap(40, 40, true)(ImageBlock),
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
  list: withWrap()(
    (props: { type: "number" | "bullet"; children: React.ReactNode }) => {
      const ListComponent =
        props.type === "number" ? OrderedList : UnorderedList;
      return <ListComponent fontSize="lg">{props.children}</ListComponent>;
    }
  ),
  listItem: (props: any) => <ListItem>{props.children}</ListItem>,
  container: (props: any) => <>{props.children}</>,
};

export const ContentPortableText = createPortableTextComponent({
  ...sanityConfig,
  serializers: serializers,
});
