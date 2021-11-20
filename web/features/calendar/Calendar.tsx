import { Box, BoxProps, Center, Heading, SimpleGrid } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { theme } from "../../utils/theme";
import { Logo } from "../shapes/Logo";
import { ShapeBackground } from "../shapes/ShapeBackground";
import { SiteFooter } from "../site-footer/SiteFooter";

const listOf24Days = Array(24)
  .fill(0)
  .map((_, i) => i + 1);

type CalendarProps = {
  year: number | string;
};

const Calendar = (props: CalendarProps) => {
  const showYearNumber = new Date().getFullYear() !== Number(props.year);
  return (
    <Center
      position="relative"
      flexDirection="column"
      minHeight="100vh"
      overflowX="hidden"
    >
      <Logo
        position={["relative", "relative", "absolute"]}
        top={["5vmin", "5vmin", "3vmin"]}
        right={["5vmin", "5vmin", "3vmin"]}
        width={["20vmin", "15vmin", "10vmin"]}
      />
      <ShapeBackground />
      {showYearNumber && (
        <Heading
          mt={12}
          color="white"
          fontSize={["2.5rem", "3.5rem", "4rem"]}
          fontWeight="normal"
        >
          The {props.year} calendar
        </Heading>
      )}
      <SimpleGrid columns={[2, 3, 4, 6]} gap="24px" margin="30px 0 80px" px={6}>
        {listOf24Days.map((day) => (
          <Day key={day} day={day} year={props.year} />
        ))}
      </SimpleGrid>
    </Center>
  );
};

export default Calendar;

type DayProps = {
  day: number;
  year: number | string;
};
function Day({ day, year }: DayProps) {
  const degreeTable = [-1.5, -1, -0.5, 0.5, 1, 1.5];
  const degreesToSkew = degreeTable[(day - 1) % degreeTable.length];
  return (
    <Link href={`/post/${year}/${day}`} passHref>
      <Box
        as="a"
        color="new.white"
        border="3px solid white"
        width="150px"
        height="150px"
        transition=".25s ease-out"
        transformOrigin="top"
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
        padding="10px"
        _hover={{
          transform: `rotateX(-30deg) skew(${degreesToSkew}deg, 0) scale(1, 1.05)`,
          boxShadow: "xl",
          background: "rgba(255, 255, 255, 0.375)",
        }}
        _focus={{
          transform: `rotateX(-30deg) skew(${degreesToSkew}deg, 0) scale(1, 1.05)`,
          boxShadow: "xl",
          background: "rgba(255, 255, 255, 0.375)",
        }}
      >
        <Heading
          as="h2"
          fontSize="40px"
          fontWeight="400"
          lineHeight="1"
          aria-label={`See the articles for day ${day}`}
        >
          {day}
        </Heading>
      </Box>
    </Link>
  );
}

const brandColors = theme.colors.brand;
export const colorCombinations = [
  {
    background: brandColors.midGreen,
    foreground: brandColors.lightPink,
  },
  {
    background: brandColors.lightPink,
    foreground: brandColors.midGreen,
  },
  {
    background: brandColors.lightGreen,
    foreground: brandColors.midGreenTransparent,
  },
  {
    background: brandColors.red,
    foreground: brandColors.lightPink,
  },
  {
    background: brandColors.peach,
    foreground: brandColors.midGreen,
  },
  {
    background: brandColors.lightGreen,
    foreground: brandColors.midGreen,
  },
];

const Snowheap = (props: BoxProps) => (
  <Box as="svg" viewBox="0 0 84 74" position="absolute" {...props}>
    <g clipPath="url(#a)">
      <path
        d="M19.3 17.7S1.5 22.4 0 13 40-4.1 55.7 2.4C71.4 8.9 86.6 19.9 83 47.5 79.4 75.1 77.9 74 71.7 73.7c-6.2-.4-5.8-21.1-10.2-22.9-4.4-1.8-3.6 7.3-9.1 5.8s-.7-24.4-6.2-28.7c-5.5-4.3-3.6 10.4-8.7 9-5.1-1.4-.7-8.3-6.9-14.1-6.2-5.8-11.3-5.1-11.3-5.1Z"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h83.5v73.8H0z" />
      </clipPath>
    </defs>
  </Box>
);
