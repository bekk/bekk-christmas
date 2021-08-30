import { Center, Heading, SimpleGrid, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import { Layout } from "../features/layout/Layout";
import Search from "../features/search/Search";
import { getAllTags } from "../utils/data";

type Props = {
  tags: { slug: string; name: string }[];
};

export default function Home({ tags }: Props) {
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
      <Stack as="section" mb={12} maxWidth="container.lg" mx="auto">
        <Heading>All calendars</Heading>
        <SimpleGrid columns={[1, 2, 3]} rowGap={6} columnGap={3}>
          {tags.map(({ slug, name }) => (
            <Link href={`/tag/${slug}`} key={slug}>
              <a>
                <Center height="200px" fontSize="3xl" background={calendarColor}>
                  {name}
                </Center>
              </a>
            </Link>
          ))}
        </SimpleGrid>
      </Stack>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      tags: await getAllTags(),
    },
  };
};
