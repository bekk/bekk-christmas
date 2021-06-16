import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import { BekkLogo } from "../design-system/BekkLogo";
import { TextLink } from "../design-system/TextLink";

type LayoutProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  author?: string;
};
export const Layout = ({
  children,
  title,
  description,
  keywords,
  image,
  author,
}: LayoutProps) => {
  return (
    <Box>
      <SiteMetadata
        title={title}
        description={description}
        keywords={keywords}
        image={image}
        author={author}
      />
      <SiteHeader title="Bekk.christmas" />
      <Box as="main">{children}</Box>
      <SiteFooter />
    </Box>
  );
};

type SiteMetadataProps = {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  author?: string;
};
const SiteMetadata = ({
  title,
  description,
  keywords = ["bekk", "christmas", "technology", "design", "strategy"],
  image = "",
  author = "Bekk",
}: SiteMetadataProps) => {
  const router = useRouter();

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(",")} />
      <meta name="author" content={author} />

      <meta property="og:title" content={title} />
      <meta property="og:type" content="article" />
      <meta
        property="og:url"
        content={`https://bekk.christmas/${router.pathname}`}
      />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@livetibekk" />
      <meta name="twitter:creator" content="@livetibekk" />
    </Head>
  );
};

type SiteHeaderProps = {
  /** The topmost title of the site */
  title: string;
};
const SiteHeader = ({ title }: SiteHeaderProps) => {
  return (
    <Box as="header">
      <Heading as="h1" textAlign="center" mt={6} mb={12}>
        {title}
      </Heading>
    </Box>
  );
};

const SiteFooter = () => {
  return (
    <Box as="footer" maxWidth="60ch" mx="auto" mt={12} textAlign="center">
      <BekkLogo maxWidth="150px" mx="auto" mb={6} />
      <Text fontSize="sm">
        Bekk is all about craftmanship and the people crafting it. We have a
        proud tradition of creating advent calendars, each with daily original
        content made by us.
      </Text>
      <Flex justifyContent="center">
        <TextLink mx={2} href="https://instagram.com/livetibekk">
          Instagram
        </TextLink>
        <TextLink mx={2} href="https://facebook.com/livetibekk">
          Facebook
        </TextLink>
        <TextLink mx={2} href="https://twitter.com/livetibekk">
          Twitter
        </TextLink>
        <TextLink mx={2} href="https://www.linkedin.com/company/bekk">
          LinkedIn
        </TextLink>
        <TextLink mx={2} href="https://blogg.bekk.no">
          Blog
        </TextLink>
      </Flex>
    </Box>
  );
};
