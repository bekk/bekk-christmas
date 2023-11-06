import {
  Box,
  BoxProps,
  Text,
  keyframes,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { ArrowLong } from "./Arrow";

type BackButtonProps = BoxProps & {
  href?: string;
  reverseDirection?: boolean;
};
export const BackButton = ({
  href = "/",
  children = "Home",
  fontSize,
  reverseDirection = false,
  ...props
}: BackButtonProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const spin = keyframes`
    0% { transform: rotate(180deg) translateX(0px); }
    50% { transform: rotate(180deg) translateX(-8px); }
    100% { transform: rotate(180deg) translateX(0px); }
  `;

  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 1s ease-in-out`;

  return (
    <Link href={href} passHref>
      <Box
        as="span"
        width="fit-content"
        aria-label={`${children}`}
        title={`${children}`}
        display="flex"
        alignItems="center"
        padding="8px"
        color="inherit"
        fontWeight="500"
        lineHeight="1.01"
        cursor="pointer"
        whiteSpace="nowrap"
        role="group"
        {...props}
      >
        {!reverseDirection && (
          <ArrowLong
            display="inline-block"
            marginRight="12px"
            width="32px"
            stroke="currentColor"
            transition="transform 0.2s"
            _groupHover={{ transform: "translateX(-8px)" }}
          />
        )}
        <Text fontWeight="normal" display="inline" fontSize={fontSize}>
          {children}
        </Text>
        {reverseDirection && (
          <ArrowLong
            display="inline-block"
            marginLeft="12px"
            width="32px"
            stroke="currentColor"
            transition="transform 0.2s"
            transform="rotate(180deg)"
            _groupHover={{ transform: "rotate(180deg) translateX(-8px)" }}
            animation={animation}
          />
        )}
      </Box>
    </Link>
  );
};
