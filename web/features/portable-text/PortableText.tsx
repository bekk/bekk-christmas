import { GridItem, ListItem, UnorderedList } from "@chakra-ui/react";
import { createPortableTextComponent } from "next-sanity";
import React from "react";
import { sanityConfig } from "../../utils/sanity/config";
import { TextLink } from "../design-system/TextLink";
import { BlockBlock } from "./serializers/BlockBlock";
import { BlockQuoteBlock } from "./serializers/BlockQuoteBlock";
import { CodeBlock } from "./serializers/CodeBlock";
import { CodePenBlock } from "./serializers/CodePenBlock";
import { CodeSandboxBlock } from "./serializers/CodeSandboxBlock";
import { IframeBlock } from "./serializers/IframeBlock";
import { ImageBlock } from "./serializers/ImageBlock";
import { TwitterBlock } from "./serializers/TwitterBlock";
import { YouTubeBlock } from "./serializers/YouTubeBlock";

const withWrap =
  (
    maxWidth: "wide" | "default" = "default",
    colSpan: number = 8,
    colStart: number = 4
  ) =>
  (Component: React.FunctionComponent) =>
  (props: any) =>
    (
      <GridItem
        colSpan={colSpan}
        colStart={colStart}
        maxWidth={maxWidth === "wide" ? "80ch" : "60ch"}
        px={maxWidth === "wide" ? "0" : "2.5rem"}
      >
        <Component {...props} />
      </GridItem>
    );

const serializers = {
  types: {
    authorReference: ({ node }: any) => <span>{node.author.name}</span>,
    block: (props: any) => {
      if (props.node.style === "blockquote") {
        return withWrap("wide")(BlockQuoteBlock)(props);
      }
      return withWrap("default")(BlockBlock)(props);
    },
    code: withWrap("wide")(CodeBlock),
    codeSandbox: withWrap("wide")(CodeSandboxBlock),
    codePen: withWrap("wide")(CodePenBlock),
    youtube: withWrap("wide")(YouTubeBlock),
    twitter: withWrap("wide")(TwitterBlock),
    mainImage: withWrap("wide")(ImageBlock),
    iframe: withWrap("wide")(IframeBlock),
    image: withWrap("wide")(ImageBlock),
    imageWithMetadata: withWrap("wide")(ImageBlock),
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
  },
  list: withWrap("default")((props) => (
    <UnorderedList>{props.children}</UnorderedList>
  )),
  listItem: (props: any) => <ListItem>{props.children}</ListItem>,
  container: (props: any) => <> {props.children} </>,
};

export const PortableText = createPortableTextComponent({
  ...sanityConfig,
  serializers: serializers,
});
