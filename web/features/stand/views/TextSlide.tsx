import { Box, Center } from "@chakra-ui/react";
import React from "react";

type TextSlideProps = { children: React.ReactNode };
export const TextSlide = ({ children }: TextSlideProps) => {
  return (
    <Center minHeight="100vh" background="brand.pink" color="brand.darkGreen">
      <Box px="2em" fontSize="5xl">
        {children}
      </Box>
    </Center>
  );
};