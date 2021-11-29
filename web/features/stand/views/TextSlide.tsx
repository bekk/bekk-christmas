import { BoxProps, Center, Stack } from "@chakra-ui/react";
import React from "react";

type TextSlideProps = { children: React.ReactNode } & BoxProps;
export const TextSlide = ({
  background = "brand.pink",
  ...props
}: TextSlideProps) => {
  return (
    <Center minHeight="100vh" background={background} color="brand.darkGreen">
      <Stack px="2em" fontSize="5xl" lineHeight="1.3" {...props} />
    </Center>
  );
};
