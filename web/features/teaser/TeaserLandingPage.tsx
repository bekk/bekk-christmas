import { Box, Heading, Text, BoxProps, Center } from "@chakra-ui/react";
import React from "react";
import { ShapeBackground } from "../shapes/ShapeBackground";
import { Logo } from "../shapes/Logo";
import Countdown from "react-countdown";

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
      <Countdown
        date={`${new Date().getFullYear()}/12/01`}
        renderer={CountdownRenderer}
      />
    </Center>
  );
};

const CountdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Heading>It's happening!</Heading>;
  } else {
    // Render a countdown
    return (
      <Box color="white" display="flex" marginTop="3rem">
        <NumberWithLabel number={days} label="Days" />
        <NumberWithLabel number={hours} label="Hours" />
        <NumberWithLabel number={minutes} label="minutes" />
        <NumberWithLabel number={seconds} label="seconds" />
      </Box>
    );
  }
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
  >
    <Text fontSize={["2.5rem", "4.5rem"]}>{number}</Text>
    <Text fontSize={["1rem", "1.5rem"]} lineHeight="1">
      {label}
    </Text>
  </Box>
);
