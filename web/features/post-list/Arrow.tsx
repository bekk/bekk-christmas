import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

export const Arrow = (props: BoxProps) => (
  <Box as="svg" viewBox="0 0 20 20" fill="none" {...props}>
    <path
      d="M11.0425 15.3845L12.1621 16.437L18.5811 9.99564L12.1543 3.59119L11.036 4.66473L15.7832 9.21066L1.01269 9.20167L1.01367 10.813L15.7842 10.822L11.0425 15.3845Z"
      fill="currentColor"
    />
  </Box>
);

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
      viewBox="-3 0 41 21"
      stroke="brand.pink"
      strokeWidth="5"
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
