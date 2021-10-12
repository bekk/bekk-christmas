import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as React from "react";
import { BekkLogo } from "../design-system/BekkLogo";
import { TextLink } from "../design-system/TextLink";

type SiteFooterProps = { preview?: boolean };
export const SiteFooter = ({ preview = false }: SiteFooterProps) => {
  const router = useRouter();
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Box
      as="footer"
      maxWidth="80ch"
      mx="auto"
      mt={12}
      mb={6}
      textAlign="center"
    >
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
        <TextLink mx={2} href="https://bekk.christmas/rss.xml">
          RSS
        </TextLink>
      </Flex>
      <Box mt={6}>
        <HStack justifyContent="center">
          <Button
            size="sm"
            variant="outline"
            colorScheme="black"
            onClick={toggleColorMode}
          >
            Turn {colorMode === "light" ? "off" : "on"} the lights!
          </Button>
          {preview && (
            <Button
              size="sm"
              variant="outline"
              colorScheme="gray"
              as="a"
              href={`/api/exit-preview?returnTo=${router.asPath}`}
            >
              Exit preview mode
            </Button>
          )}
        </HStack>
      </Box>
    </Box>
  );
};
