import { Box, Center, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { TextLink } from "../features/design-system/TextLink";

const PageNotFoundPage = () => (
  <Center height="100vh" textAlign="center" background="brand.darkGreen">
    <Box>
      <Heading as="h1" fontSize="5.5em" mb={6} color="brand.pink">
        404
      </Heading>
      <Text fontSize="2xl" color="white">
        Page not found, return <TextLink href="/">here</TextLink>
      </Text>
    </Box>
  </Center>
);

export default PageNotFoundPage;
