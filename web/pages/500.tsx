import { Box, Center, Heading, Text } from "@chakra-ui/react";
import React from "react";

const InternalErrorPage = () => (
  <Center height="100vh" textAlign="center" background="brand.darkGreen">
    <Box>
      <Heading as="h1" fontSize="5.5em" mb={6} color="brand.pink">
        500
      </Heading>
      <Text fontSize="2xl" color="white">
        Søren. Sorry.
      </Text>
    </Box>
  </Center>
);

export default InternalErrorPage;
