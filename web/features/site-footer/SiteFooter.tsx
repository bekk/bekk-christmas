import { Box, Center, Image, Text } from "@chakra-ui/react";
import React from "react";
import { BekkLogo } from "../design-system/BekkLogo";

export const SiteFooter = () => {
  return (
    <Center minHeight="30vh" textAlign="center">
      <Box>
        <BekkLogo />
        <Text mt={6}>Proudly powered by</Text>
        <a href="https://sanity.io" rel="noopener noreferrer">
          <Image
            src="/logos/sanity.svg"
            alt="Sanity.io"
            title="Sanity"
            width="5rem"
            mx="auto"
          />
        </a>
      </Box>
    </Center>
  );
};
