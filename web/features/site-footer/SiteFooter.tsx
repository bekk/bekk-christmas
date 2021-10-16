import { Box, Center, Image, Text } from "@chakra-ui/react";
import React from "react";
import { BekkLogo } from "../design-system/BekkLogo";

export const SiteFooter = () => {
  return (
    <Center minHeight="30vh" textAlign="center">
      <Box>
        <a href="https://bekk.no">
          <BekkLogo />
        </a>
        <Text mt={6}>Proudly powered by</Text>
        <a href="https://sanity.io">
          <Image
            src="/logos/sanity.svg"
            alt="Sanity.io"
            width="5rem"
            mx="auto"
          />
        </a>
      </Box>
    </Center>
  );
};
