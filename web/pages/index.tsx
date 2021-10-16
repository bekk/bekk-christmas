import {
  Center,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { groq } from "next-sanity";
import Link from "next/link";
import React from "react";
import { Layout } from "../features/layout/Layout";
import { generateRss } from "../utils/rss";
import { getClient } from "../utils/sanity/sanity.server";

type HomePageProps = {
  tags: Tag[];
};

export default function HomePage({ tags }: HomePageProps) {
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
        A perfect storm of content.
        <br />
        Made with 🎅 in Oslo and Trondheim, Norway!
      </Text>

      <Stack as="section" mb={12} maxWidth="container.lg" mx="auto">
        <Heading>All calendars</Heading>
        <SimpleGrid columns={[1, 2, 3]} rowGap={6} columnGap={3}>
          {tags.map(({ slug, name }) => (
            <Link href={`/tag/${slug}`} key={slug}>
              <a>
                <Center
                  height="200px"
                  fontSize="3xl"
                  background={calendarColor}
                >
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

type Tag = {
  slug: string;
  name: string;
  synonyms: string[];
};

export const getStaticProps: GetStaticProps = async () => {
  // We generate a new RSS feed every time the index page is built.
  // This creates a new public/rss.xml file with the latest articles.
  await generateRss();

  const tags = await getClient().fetch<Tag[]>(groq`*[_type == "tag"]`);

  return {
    props: {
      tags,
    },
  };
};
