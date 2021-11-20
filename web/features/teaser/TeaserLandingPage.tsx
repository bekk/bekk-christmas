import { Box, Text, BoxProps, Center } from "@chakra-ui/react";
import React from "react";
import { ShapeBackground } from "../shapes/ShapeBackground";
import { Logo } from "../shapes/Logo";

export const TeaserLandingPage = () => {
  return (
    <Center
      position="relative"
      height="100vh"
      width="100vw"
      flexDirection="column"
    >
      <ShapeBackground />
      <a href="/post/2020">
        <Logo width={["75vmin", "40vmin"]} />
      </a>
      <Countdown />
    </Center>
  );
};

const Countdown = (props: BoxProps) => {
  return (
    <Box color="white" display="flex" marginBottom="50px" {...props}>
      <NumberWithLabel number="6" label="Days" />
      <NumberWithLabel number="4" label="Hours" />
      <NumberWithLabel number="11" label="minutes" />
      <NumberWithLabel number="47" label="seconds" />
    </Box>
  );
};

const NumberWithLabel = ({
  number,
  label,
}: {
  number: string;
  label: string;
}) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    mx={["0.75rem", "1.5rem"]}
    fontFamily="heading"
    marginTop="3rem"
  >
    <Text fontSize={["2.5rem", "4.5rem"]} lineHeight="1">
      {number}
    </Text>
    <Text fontSize={["1rem", "1.5rem"]} lineHeight="1">
      {label}
    </Text>
  </Box>
);
