import { Box, Center, Heading, SimpleGrid } from "@chakra-ui/react";
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
            <Day key={day} day={day} />
          ))}
        </SimpleGrid>
      </Center>
      <SiteFooter />
    </Box>
  );
}

type DayProps = {
  day: number;
};
function Day({ day }: DayProps) {
  const colors = colorCombinations[(day - 1) % colorCombinations.length];
  return (
    <Link href={`/day/${day}`} passHref>
      <Center
        as="a"
        href={`/day/${day}`}
        backgroundColor={colors.background}
        color={colors.foreground}
        width="100%"
        maxWidth="200px"
        height="200px"
        transition=".25s ease-out"
        transformOrigin="top"
        _hover={{
          transform: "rotateX(-30deg) skew(1.5deg, 0) scale(1, 1.05)",
          boxShadow: "xl",
        }}
        _focus={{
          transform: "rotateX(-30deg) skew(1.5deg, 0) scale(1, 1.05)",
          boxShadow: "xl",
        }}
      >
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

type DayColors = {
  background: string;
  foreground: string;
};

const brandColors = theme.colors.brand;
const colorCombinations: DayColors[] = [
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

export const getStaticProps: GetStaticProps = async () => {
  // We generate a new RSS feed every time the index page is built.
  // This creates a new public/rss.xml file with the latest articles.
  await generateRss();
  return {
    props: {},
  };
};
