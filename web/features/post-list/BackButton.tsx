import { Box, BoxProps, Heading } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { ArrowLong } from "./Arrow";

type BackButtonProps = BoxProps & { href?: string };
export const BackButton = ({
  href = "/",
  children = "Home",
  fontSize,
  ...props
}: BackButtonProps) => {
  return (
    <Link href={href} passHref>
      <Box
        as="a"
        width="fit-content"
        aria-label={`${children}`}
        title={`${children}`}
        display="flex"
        alignItems="center"
        padding="8px"
        color="inherit"
        fontWeight="bold"
        lineHeight="1.01"
        cursor="pointer"
        role="group"
        {...props}
      >
        <ArrowLong
          display="inline-block"
          marginRight="12px"
          width="32px"
          stroke="currentColor"
          transition="transform 0.2s"
          _groupHover={{ transform: "translateX(-8px)" }}
        />
        <Heading
          as="h3"
          fontWeight="normal"
          display="inline"
          fontSize={fontSize}
        >
          {children}
        </Heading>
      </Box>
    </Link>
  );
};
