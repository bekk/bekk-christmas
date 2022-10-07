import { Code } from "@chakra-ui/react";
import React from "react";
import { TextLink } from "../design-system/TextLink";
import { PortableText as PortableTextComponent } from "@portabletext/react";

const serializers = {
  marks: {
    link: (props: any) => (
      <TextLink href={props.mark.href}>{props.children}</TextLink>
    ),
    code: Code,
  },
};

export const DescriptionPortableText = (props) => (
  <PortableTextComponent
    components={{
      serializers,
    }}
    {...props}
  />
);
