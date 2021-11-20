import { Box, Text, BoxProps, Center } from "@chakra-ui/react";
import React from "react";
import { ShapeBackground } from "../shapes/ShapeBackground";
import { Logo } from "../shapes/Logo";

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
    margin="0 1.5rem"
    fontFamily="heading"
  >
    <Text fontSize="4.5rem" lineHeight="1">
      {number}
    </Text>
    <Text fontSize="1.5rem" lineHeight="1">
      {label}
    </Text>
  </Box>
);

const Countdown = (props: BoxProps) => {
  return (
    <Box {...props} color="white" display="flex">
      <NumberWithLabel number="6" label="Days" />
      <NumberWithLabel number="4" label="Hours" />
      <NumberWithLabel number="11" label="minutes" />
      <NumberWithLabel number="47" label="seconds" />
    </Box>
  );
};

export const TeaserLandingPage = () => {
  return (
    <Center position="relative" height="100vh" flexDirection="column">
      <ShapeBackground />
      <a href="/post/2020">
        <Logo />
      </a>
      <Countdown position="absolute" bottom="15vh" />
    </Center>
  );
};
