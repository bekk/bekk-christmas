import { BoxProps, Center, Stack } from "@chakra-ui/react";
import React from "react";

type TextSlideProps = { children: React.ReactNode } & BoxProps;
export const TextSlide = ({
  background = "brand.darkGreen",
  color = "brand.white",
  ...props
}: TextSlideProps) => {
  return (
    <Center height="100vh" width="100vw" background={background} color={color}>
      <Stack px="2em" fontSize="5xl" lineHeight="1.3" {...props} />
    </Center>
  );
};
