import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

export const ArrowSlim = (props: BoxProps) => {
  return (
    <Box as="svg" viewBox="0 0 24 16" {...props}>
      <path
        d="m16.25 0-.68.69 6.58 6.57H0v.97h22.15l-6.58 6.58.68.69L24 7.75 16.25 0Z"
        fill="currentColor"
      />
    </Box>
  );
};

export const ArrowShort = (props: BoxProps) => {
  return (
    <Box
      as="svg"
      width="45"
      viewBox="0 0 45 27"
      stroke="brand.salmon"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      {...props}
    >
      <path d="M3.71765 13.4805L41.5039 13.4805" />
      <path d="M33.4881 3.5625C33.4881 3.5625 37.891 8.24529 41.3821 11.9584C42.0974 12.7192 42.1062 13.9012 41.4035 14.6735L33.4881 23.3728" />
    </Box>
  );
};

export const ArrowLong = (props: BoxProps) => {
  return (
    <Box
      as="svg"
      width="37"
      height="21"
      viewBox="0 0 37 21"
      stroke="brand.pink"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      {...props}
    >
      <path d="M35 9.99902H2" />
      <path d="M9 18.5117C9 18.5117 5.31643 14.6621 2.30118 11.5109C1.56997 10.7467 1.56052 9.54575 2.27912 8.76972L9 1.51172" />
    </Box>
  );
};
