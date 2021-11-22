import { Box, Center } from "@chakra-ui/react";
import React from "react";

type TitleSlideProps = { children: React.ReactNode };
export const TitleSlide = ({ children }: TitleSlideProps) => {
  return (
    <Center minHeight="100vh" background="brand.pink" color="brand.darkGreen">
      <Box
        fontFamily="heading"
        fontSize="8em"
        lineHeight="1"
        textAlign="center"
      >
        {children}
      </Box>
    </Center>
  );
};
