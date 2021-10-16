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
        title="Bekk Christmas - advent calendars about tech, design and strategy"
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

function Day({ day }: { day: number }) {
  const colors = randomColors();
  return (
    <Link href={`/day/${day}`} passHref>
      <Center
        as="a"
        href={`/day/${day}`}
        backgroundColor={colors.background}
        color={colors.number}
        width="200px"
        height="200px"
      >
        <Heading as="h2" fontSize={100}>
          {day}
        </Heading>
      </Center>
    </Link>
  );
}

type DayColors = {
  background: string;
  number: string;
};

// TODO Missing or wrong combos. I'm color blind give me a break
const colorCombinations: DayColors[] = [
  {
    background: theme.colors.brand.midGreen,
    number: theme.colors.brand.lightPink,
  },
  {
    background: theme.colors.brand.lightPink,
    number: theme.colors.brand.midGreen,
  },
  {
    background: theme.colors.brand.lightGreen,
    number: theme.colors.brand.midGreenTransparent,
  },
  { background: theme.colors.brand.red, number: theme.colors.brand.lightPink },
  {
    background: theme.colors.brand.peach,
    number: theme.colors.brand.midGreen,
  },
  {
    background: theme.colors.brand.lightGreen,
    number: theme.colors.brand.midGreen,
  },
];

function randomColors(): DayColors {
  const randomIndex = Math.floor(Math.random() * colorCombinations.length);
  return colorCombinations[randomIndex];
}

export const getStaticProps: GetStaticProps = async () => {
  // We generate a new RSS feed every time the index page is built.
  // This creates a new public/rss.xml file with the latest articles.
  await generateRss();
  return {
    props: {},
  };
};
