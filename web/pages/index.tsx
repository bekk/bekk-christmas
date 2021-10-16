import { Center, Heading, SimpleGrid } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import { SiteMetadata } from "../features/layout/SiteMetadata";
import { generateRss } from "../utils/rss";
import { theme } from "../utils/theme";

export default function HomePage() {
  return (
    <Center flexDirection={"column"} backgroundColor={"brand.darkGreen"}>
      <SiteMetadata
        title="Bekk Christmas - advent calendars about technology, design and strategy"
        description="Get in the holiday spirit by diving into some of the many hundred articles we've made for you"
      />
      <Heading
        as="h1"
        fontSize="56px"
        lineHeight="66px"
        fontWeight="400"
        paddingBottom={20}
        paddingTop={60}
        color={"brand.lightPink"}
      >
        The Day
      </Heading>
      <SimpleGrid columns={[1, 2, 3, 4]} gap={6}>
        {Array(24)
          .fill(undefined)
          .map((_, index) => (
            <Day key={index} day={index + 1} />
          ))}
      </SimpleGrid>
    </Center>
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
        width="200px"
        height="200px"
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

// TODO Missing or wrong combos. I'm color blind give me a break
const colorCombinations: DayColors[] = [
  {
    background: theme.colors.brand.midGreen,
    foreground: theme.colors.brand.lightPink,
  },
  {
    background: theme.colors.brand.lightPink,
    foreground: theme.colors.brand.midGreen,
  },
  {
    background: theme.colors.brand.lightGreen,
    foreground: theme.colors.brand.midGreenTransparent,
  },
  {
    background: theme.colors.brand.red,
    foreground: theme.colors.brand.lightPink,
  },
  {
    background: theme.colors.brand.peach,
    foreground: theme.colors.brand.midGreen,
  },
  {
    background: theme.colors.brand.lightGreen,
    foreground: theme.colors.brand.midGreen,
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
