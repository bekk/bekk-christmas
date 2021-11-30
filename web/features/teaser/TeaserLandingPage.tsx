import { Box, Center, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import Countdown, { CountdownRendererFn } from "react-countdown";
import { BekkChristmasLogo } from "../design-system/BekkChristmasLogo";
import { ShapeBackground } from "../shapes/ShapeBackground";

const useClientSideOnly = () => {
  const [isClientSide, setIsClientSide] = React.useState(false);
  React.useEffect(() => {
    setIsClientSide(true);
  }, []);
  return isClientSide;
};

export const TeaserLandingPage = () => {
  const isClientSide = useClientSideOnly();
  return (
    <Center
      position="relative"
      height="100vh"
      width="100vw"
      flexDirection="column"
    >
      <ShapeBackground isFullPage />
      <Link href="/post/2021">
        <a>
          <BekkChristmasLogo width={["50vmin", "40vmin"]} marginTop="3rem" />
        </a>
      </Link>
      {isClientSide && (
        <Countdown
          date={`${new Date().getFullYear()}/12/01`}
          renderer={CountdownRenderer}
        />
      )}
    </Center>
  );
};
const CountdownRenderer: CountdownRendererFn = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}) => {
  if (completed) {
    return <Heading>It's happening!</Heading>;
  } else {
    return (
      <Box color="white" display="flex" marginTop="7rem">
        <NumberWithLabel number={days} label="Days" />
        <NumberWithLabel number={hours} label="Hours" />
        <NumberWithLabel number={minutes} label="Minutes" />
        <NumberWithLabel number={seconds} label="Seconds" />
      </Box>
    );
  }
};

const NumberWithLabel = ({
  number,
  label,
}: {
  number: number;
  label: string;
}) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    mx={["0.75rem", "1.5rem"]}
    fontFamily="heading"
  >
    <Text fontSize={["2.5rem", "4.5rem"]} lineHeight="1">
      {number}
    </Text>
    <Text fontSize={["1rem", "1.5rem"]} lineHeight="1">
      {label}
    </Text>
  </Box>
);
