import { Box, BoxProps, Heading } from "@chakra-ui/react";
import React from "react";
import RelatedLink from "./RelatedLink";

const RelatedLinks = (
  props: BoxProps & {
    relatedLinks: { title: string; description: string; url: string }[];
  }
) => {
  return (
    <Box display="flex" flexDirection="column" gridGap={4} {...props}>
      <Heading fontWeight="normal" color="brand.darkGreen">
        Up next...
      </Heading>
      {props.relatedLinks.map((link) => (
        <RelatedLink key={link.url} link={link} />
      ))}
    </Box>
  );
};

export default RelatedLinks;
