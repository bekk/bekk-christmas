import { Center } from "@chakra-ui/react";
import React from "react";
import { BekkChristmasLogo } from "../../design-system/BekkChristmasLogo";

export const LogoSlide = () => {
  return (
    <Center minHeight="100vh" background="brand.darkGreen" color="brand.pink">
      <BekkChristmasLogo maxWidth="60vw" />
    </Center>
  );
};
