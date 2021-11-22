import React from "react";
import { Box, BoxProps, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { ArrowLong } from "./Arrow";

export const BackButton = (props: BoxProps) => {
  return (
    <Link href="/" passHref>
      <Box
        as="a"
        display="block"
        padding="8px"
        title="Back to blog"
        color="brand.pink"
        fontSize={["1.5rem", "2rem"]}
        lineHeight="1"
        cursor="pointer"
        role="group"
        {...props}
      >
        <ArrowLong
          display="inline-block"
          marginRight="12px"
          width="32px"
          stroke="currentColor"
          transition="transform 0.2s"
          _groupHover={{ transform: "translateX(-8px)" }}
        />
        <Heading as="h3" fontWeight="400" display="inline">
          Home
        </Heading>
      </Box>
    </Link>
  );
};
