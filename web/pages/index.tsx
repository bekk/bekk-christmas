import { Box, BoxProps, Center, Heading, SimpleGrid } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import { SiteMetadata } from "../features/layout/SiteMetadata";
import { SiteFooter } from "../features/site-footer/SiteFooter";
import { Snowfall } from "../features/snowfall/Snowfall";
import { generateRss } from "../utils/rss";
import { theme } from "../utils/theme";

const listOf24Days = Array(24)
  .fill(0)
  .map((_, i) => i + 1);

export default function HomePage() {
  return (
    <Box>
      <SiteMetadata
        title="Bekk Christmas - advent calendars about technology, design and strategy"
        description="Get in the holiday spirit by diving into some of the many hundred articles we've made for you"
      />
      <Center flexDirection="column" backgroundColor="brand.darkGreen">
        <Snowfall />
        <Heading as="h1" mt="80px" color="brand.lightPink" position="relative">
          <Box
            as="span"
            fontSize="lg"
            fontFamily="body"
            fontWeight="400"
            position="absolute"
            top="0.1em"
            left="3.4em"
          >
            Bekk
          </Box>
          <Box as="span" fontSize="72px" fontWeight="400">
            Christmas
          </Box>
        </Heading>
        <SimpleGrid
          columns={[2, 2, 3, 4]}
          gap={6}
          my="40px"
          width="100%"
          maxWidth="872px"
          px={6}
        >
          {listOf24Days.map((day) => (
            <Day key={day} day={day} year={2020} />
          ))}
        </SimpleGrid>
      </Center>
      <SiteFooter />
    </Box>
  );
}

type DayProps = {
  day: number;
  year: number;
};
function Day({ day, year }: DayProps) {
  const colors = colorCombinations[(day - 1) % colorCombinations.length];
  const degreeTable = [-1.5, -0.75, 0.75, 1.5];
  const daysToDecorateWithSnow = [4, 5, 11, 19, 24];
  const degreesToSkew = degreeTable[(day - 1) % degreeTable.length];
  return (
    <Link href={`/post/${year}/${day}`} passHref>
      <Center
        as="a"
        backgroundColor={colors.background}
        color={colors.foreground}
        width="100%"
        maxWidth="200px"
        height="200px"
        transition=".25s ease-out"
        transformOrigin="top"
        position="relative"
        _hover={{
          transform: `rotateX(-30deg) skew(${degreesToSkew}deg, 0) scale(1, 1.05)`,
          boxShadow: "xl",
        }}
        _focus={{
          transform: `rotateX(-30deg) skew(${degreesToSkew}deg, 0) scale(1, 1.05)`,
          boxShadow: "xl",
        }}
      >
        {daysToDecorateWithSnow.includes(day) && (
          <Snowheap top="-16px" right="-16px" width="60%" />
        )}
        <Heading
          as="h2"
          fontSize="100px"
          fontWeight="400"
          aria-label={`See the articles for day ${day}`}
        >
          {day}
        </Heading>
      </Center>
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

export const getStaticProps: GetStaticProps = async () => {
  // We generate a new RSS feed every time the index page is built.
  // This creates a new public/rss.xml file with the latest articles.
  await generateRss();
  return {
    props: {},
  };
};
