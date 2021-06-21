import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { BrokenBalls } from "../features/broken-balls/BrokenBalls";
import { TextLink } from "../features/design-system/TextLink";
import { Layout } from "../features/layout/Layout";

const InternalErrorPage = () => (
  <Layout
    title="Something broke"
    description=""
    headerLink="/"
    headerTitle="Bekk Christmas"
  >
    <Box width="80%" maxWidth="380px" textAlign="center" mx="auto">
      <Heading as="h1" fontSize="5.5em" mb={6}>
        500
      </Heading>
      <BrokenBalls />
      <Heading as="h2" fontSize="4xl" mt={6}>
        Oh balls...
      </Heading>
      <Text>
        Yup, something definitely broke. Try again, or{" "}
        <TextLink href="/">go back to start</TextLink>.
      </Text>
    </Box>
  </Layout>
);

export default InternalErrorPage;
