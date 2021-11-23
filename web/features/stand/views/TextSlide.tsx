import { Box, BoxProps, Center } from "@chakra-ui/react";
import React from "react";

type TextSlideProps = { children: React.ReactNode } & BoxProps;
export const TextSlide = (props: TextSlideProps) => {
  return (
    <Center minHeight="100vh" background="brand.pink" color="brand.darkGreen">
      <Box px="2em" fontSize="5xl" lineHeight="1.3" {...props} />
    </Center>
  );
};
