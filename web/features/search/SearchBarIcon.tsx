import { Box, BoxProps } from "@chakra-ui/react";

export const SearchBarIcon = (props: BoxProps) => {
  return (
    <Box display="block" {...props}>
      <svg
        width="13"
        height="26"
        viewBox="0 0 13 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="6.5" cy="6.5" r="6.5" fill="#00BC74" />
        <circle cx="6.5" cy="12.5" r="6.5" fill="#FF8E91" />
        <circle cx="6.5" cy="19.5" r="6.5" fill="#FFF19F" />
      </svg>
    </Box>
  );
};
