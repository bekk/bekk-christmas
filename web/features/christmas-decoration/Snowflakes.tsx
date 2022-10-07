import { Box, BoxProps } from "@chakra-ui/react";

export const Snowflakes = (props: BoxProps) => {
  return (
    <Box as="svg" {...props} viewBox="0 0 158 111" fill="none">
      <path
        d="M82 56.1A9 9 0 1 0 82 38a9 9 0 0 0 0 18.1Zm-18-38A9 9 0 1 0 64 0a9 9 0 0 0 0 18.1Zm-55 92A9 9 0 1 0 9 92a9 9 0 0 0 0 18.1Zm9-54A9 9 0 1 0 18 38a9 9 0 0 0 0 18.1Zm130-15a9 9 0 1 0 0-18.1 9 9 0 0 0 0 18.1Z"
        fill="#fff"
      />
    </Box>
  );
};
