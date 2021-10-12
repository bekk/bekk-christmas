import { Box, BoxProps, Flex } from "@chakra-ui/react";
import * as React from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { SiteMetadata } from "./SiteMetadata";

type LayoutProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  author?: string;
  headerLink?: string;
  headerTitle?: string;
  px?: BoxProps["px"];
  preview?: boolean;
};
export const Layout = ({
  children,
  title,
  description,
  keywords,
  headerLink = "/",
  headerTitle = "Bekk Christmas",
  image,
  author,
  px = 4,
  preview = false,
}: LayoutProps) => {
  return (
    <Flex minHeight="100vh" flexDirection="column">
      <SiteMetadata
        title={preview ? `PREVIEW - ${title}` : title}
        description={description}
        keywords={keywords}
        image={image}
        author={author}
      />
      <SiteHeader link={headerLink}>{headerTitle}</SiteHeader>
      <Box as="main" flex="1" px={px}>
        {children}
      </Box>
      <SiteFooter preview={preview} />
    </Flex>
  );
};
