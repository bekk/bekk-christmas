import { Box, Heading } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

type SiteHeaderProps = {
  /** The topmost title of the site */
  children: string;
  /** Where to link to */
  link: string;
};
export const SiteHeader = ({ link, children }: SiteHeaderProps) => {
  return (
    <Box as="header">
      <Heading as="h1" textAlign="center" mt={6} mb={12}>
        <Link href={link}>
          <a>{children}</a>
        </Link>
      </Heading>
    </Box>
  );
};
