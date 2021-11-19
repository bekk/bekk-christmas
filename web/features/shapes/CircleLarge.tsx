import { Box, BoxProps } from "@chakra-ui/react";

export const CircleLarge = (props: BoxProps) => {
  return (
    <Box
      as="svg"
      {...props}
      width="1000"
      height="1000"
      viewBox="0 0 851 851"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M425.5 851C660.497 851 851 660.497 851 425.5C851 190.503 660.497 0 425.5 0C190.503 0 0 190.503 0 425.5C0 660.497 190.503 851 425.5 851Z"
        fill="#007E4E"
      />
    </Box>
  );
};
