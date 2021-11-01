import { Code } from "@chakra-ui/react";
import { createPortableTextComponent } from "next-sanity";
import React from "react";
import { sanityConfig } from "../../utils/sanity/config";
import { TextLink } from "../design-system/TextLink";

const serializers = {
  marks: {
    link: (props: any) => (
      <TextLink href={props.mark.href}>{props.children}</TextLink>
    ),
    code: Code,
  },
};

export const DescriptionPortableText = createPortableTextComponent({
  ...sanityConfig,
  serializers: serializers,
});
