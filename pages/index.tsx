import { Center, Heading, SimpleGrid, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import { HorizontalRule } from "../features/design-system/HorizontalRule";
import { Layout } from "../features/layout/Layout";
import Search from "../features/search/Search";
import { calendarInfo } from "../utils/calendars";
import { getCalendarsGroupedByYear } from "../utils/data";

type Props = {
  calendarsGroupedByYear: { year: number; calendars: string[] }[];
};
export default function Home({ calendarsGroupedByYear }: Props) {
  const calendarColor = useColorModeValue("red.100", "red.800");
  return (
    <Layout
      title="Bekk Christmas - advent calendars about tech, design and strategy"
      description="Get in the holiday spirit by diving into some of the many hundred articles we've made for you"
      headerLink="/"
      keywords={[
        "tech",
        "technology",
        "design",
        "ux",
        "visual",
        "strategy",
        "business",
        "articles",
      ]}
    >
      <Text fontSize="5xl" maxWidth="container.lg" mx="auto" mb={12}>
        264 articles, 24 days.
        <br />
        Made with 🎅 in Oslo and Trondheim, Norway!
      </Text>
      <Search />
      {calendarsGroupedByYear.map(({ year, calendars }, index) => (
        <Stack as="section" key={year} mb={12} maxWidth="container.lg" mx="auto">
          <Heading>{year} calendars</Heading>
          <SimpleGrid columns={[1, 2, 3]} rowGap={6} columnGap={3}>
            {calendars.map((calendar) => {
              const info = calendarInfo[calendar];
              return (
                <Link href={`/${calendar}/${year}`} key={calendar}>
                  <a>
                    <Center height="200px" key={calendar} fontSize="3xl" background={calendarColor}>
                      {info?.displayName || calendar}
                    </Center>
                  </a>
                </Link>
              );
            })}
          </SimpleGrid>
          {index === 0 && <HorizontalRule pt={12} />}
        </Stack>
      ))}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      calendarsGroupedByYear: getCalendarsGroupedByYear(),
    },
  };
};
