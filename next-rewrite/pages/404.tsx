import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { BrokenBalls } from "../features/broken-balls/BrokenBalls";
import { TextLink } from "../features/design-system/TextLink";
import { Layout } from "../features/layout/Layout";

const PageNotFoundPage = () => (
  <Layout
    title="Page not found"
    description=""
    headerLink="/"
    headerTitle="Bekk Christmas"
  >
    <Box width="80%" maxWidth="380px" textAlign="center" mx="auto">
      <Heading as="h1" fontSize="5.5em" mb={6}>
        404
      </Heading>
      <BrokenBalls />
      <Heading as="h2" fontSize="4xl" mt={6}>
        Oh balls...
      </Heading>
      <Text>
        Page not found, return <TextLink href="/">here</TextLink>
      </Text>
    </Box>
  </Layout>
);

export default PageNotFoundPage;
