import { Box, IconButton, IconButtonProps } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export const ArticleBackButton = (props: Partial<IconButtonProps>) => {
  return (
    <Link href="/" passHref>
      <IconButton
        as="a"
        aria-label="Back to blog"
        title="Back to blog"
        variant="outline"
        colorScheme="white"
        {...props}
      >
        <Box
          width="0.7em"
          height="0.7em"
          borderLeft="1px solid currentColor"
          borderTop="1px solid currentColor"
          transform="rotate(-45deg)"
          position="relative"
          left="0.2em"
        />
      </IconButton>
    </Link>
  );
};
