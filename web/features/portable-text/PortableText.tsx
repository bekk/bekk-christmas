import { Box, Container, ListItem, Stack, UnorderedList } from "@chakra-ui/react";
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

const serializers = {
  types: {
    authorReference: ({ node }: any) => <span>{node.author.name}</span>,
    block: withWrap("default")(BlockBlock),
    code: withWrap("wide")(CodeBlock),
    codeSandbox: withWrap("wide")(CodeSandboxBlock),
    codePen: withWrap("wide")(CodePenBlock),
    youtube: withWrap("wide")(YouTubeBlock),
    twitter: withWrap("wide")(TwitterBlock),
    mainImage: withWrap("wide")(ImageBlock),
  },
  marks: {
    link: (props: any) => <TextLink href={props.mark.href}>{props.children}</TextLink>,
  },
  list: withWrap()((props) => <UnorderedList>{props.children}</UnorderedList>),
  listItem: (props: any) => <ListItem>{props.children}</ListItem>,
  container: (props: any) => <Stack {...props} spacing={6} />,
};

export const PortableText = createPortableTextComponent({
  ...sanityConfig,
  serializers: serializers,
});
