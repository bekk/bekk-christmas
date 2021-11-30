import { Box, Center } from "@chakra-ui/react";
import React from "react";
import { ShapeBackground } from "../../shapes/ShapeBackground";

type TitleSlideProps = { children: React.ReactNode };
export const TitleSlide = ({ children }: TitleSlideProps) => {
  return (
    <Center
      height="100vh"
      width="100vw"
      position="relative"
      color="brand.white"
      px="2em"
    >
      <ShapeBackground />
      <Box
        fontFamily="heading"
        fontSize={["4em", "5em"]}
        lineHeight="1"
        textAlign="center"
      >
        {children}
      </Box>
    </Center>
  );
};
