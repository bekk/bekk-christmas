import { Box, BoxProps, Center, Image } from "@chakra-ui/react";
import React from "react";

type ImageSlideProps = {
  src: string;
  children?: string;
} & BoxProps;
export const ImageSlide = ({ children, src, ...props }: ImageSlideProps) => {
  return (
    <Center minHeight="100vh" background="brand.pink" color="brand.darkGreen">
      <Box px="2em" fontSize="4xl" lineHeight="1.3" {...props}>
        <Image src={src} alt={children} />
        {children && <Box pt={6}>{children}</Box>}
      </Box>
    </Center>
  );
};
