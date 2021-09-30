import { Box, Container, List, ListItem, Stack, UnorderedList } from "@chakra-ui/react";
import { createPortableTextComponent } from "next-sanity";
import React from "react";
import { sanityConfig } from "../../utils/sanity/config";
import { TextLink } from "../design-system/TextLink";
import { BlockBlock } from "./serializers/BlockBlock";
import { CodeBlock } from "./serializers/CodeBlock";
import { CodePenBlock } from "./serializers/CodePenBlock";
import { CodeSandboxBlock } from "./serializers/CodeSandboxBlock";
import { ImageBlock } from "./serializers/ImageBlock";
import { TwitterBlock } from "./serializers/TwitterBlock";
import { YouTubeBlock } from "./serializers/YouTubeBlock";

const defaultSerializers = {
  types: {
    authorReference: ({ node }: any) => <span>{node.author.name}</span>,
    block: BlockBlock,
    list: List,
    listItem: ListItem,
    code: CodeBlock,
    codeSandbox: CodeSandboxBlock,
    codePen: CodePenBlock,
    youtube: YouTubeBlock,
    twitter: TwitterBlock,
    mainImage: ImageBlock,
  },
  marks: {
    link: (props: any) => <TextLink href={props.mark.href}>{props.children}</TextLink>,
  },
  container: (props: any) => <Stack {...props} spacing={6} />,
};

export const IngressPortableText = createPortableTextComponent({
  ...sanityConfig,
  serializers: defaultSerializers,
});

const withWrap =
  (maxWidth: "wide" | "default" = "default") =>
  (Component: React.FunctionComponent) =>
  (props: any) =>
    (
      <Box>
        <Container maxWidth={maxWidth === "wide" ? "80ch" : "60ch"}>
          <Component {...props} />
        </Container>
      </Box>
    );

const contentSerializers = {
  ...defaultSerializers,
  types: {
    authorReference: ({ node }: any) => <span>{node.author.name}</span>,
    block: withWrap()(BlockBlock),
    code: withWrap("wide")(CodeBlock),
    codeSandbox: withWrap("wide")(CodeSandboxBlock),
    codePen: withWrap("wide")(CodePenBlock),
    youtube: withWrap("wide")(YouTubeBlock),
    twitter: withWrap("wide")(TwitterBlock),
    mainImage: withWrap("wide")(ImageBlock),
  },
  list: withWrap()((props) => <UnorderedList>{props.children}</UnorderedList>),
  listItem: (props: any) => <ListItem>{props.children}</ListItem>,
};

export const ContentPortableText = createPortableTextComponent({
  ...sanityConfig,
  serializers: contentSerializers,
});
