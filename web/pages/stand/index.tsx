import { Center, Heading } from "@chakra-ui/react";
import React from "react";

export default function StandPage() {
  return (
    <Center minHeight="100vh" background="brand.darkGreen" color="white">
      <Heading as="h1" fontSize="4xl" fontWeight="normal">
        Stand!
      </Heading>
    </Center>
  );
}
