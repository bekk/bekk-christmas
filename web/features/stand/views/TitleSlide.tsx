import { Box, Center } from "@chakra-ui/react";
import React from "react";

type TitleSlideProps = { children: React.ReactNode };
export const TitleSlide = ({ children }: TitleSlideProps) => {
  return (
    <Center
      height="100vh"
      width="100vw"
      color="brand.white"
      backgroundColor="brand.darkGreen"
      px="2em"
    >
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
