import { Center } from "@chakra-ui/react";
import React from "react";
import { BekkChristmasLogo } from "../../design-system/BekkChristmasLogo";
import { ShapeBackground } from "../../shapes/ShapeBackground";

export const LogoSlide = () => {
  return (
    <Center
      position="relative"
      height="100vh"
      width="100vw"
      flexDirection="column"
    >
      <ShapeBackground isFullPage />
      <BekkChristmasLogo width={["50vmin", "40vmin"]} marginTop="3rem" />
    </Center>
  );
};
