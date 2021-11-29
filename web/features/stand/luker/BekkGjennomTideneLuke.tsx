import { Image } from "@chakra-ui/react";
import React from "react";
import { useSlideshow } from "../useSlideshow";
import { TitleSlide } from "../views/TitleSlide";

export const BekkGjennomTideneLuke = () => {
  return useSlideshow([
    <TitleSlide key={1}>Bekk.no gjennom tidene</TitleSlide>,
    <Image
      key={2}
      width="100vw"
      height="100vh"
      objectFit="cover"
      src="/images/bekkno-gjennom-tidene/bekkno-2000.png"
      alt="Bekk.no i 2000"
    />,
    <Image
      key={3}
      width="100vw"
      height="100vh"
      objectFit="cover"
      src="/images/bekkno-gjennom-tidene/bekkno-2002.png"
      alt="Bekk.no i 2002"
    />,
    <Image
      key={4}
      width="100vw"
      height="100vh"
      objectFit="cover"
      src="/images/bekkno-gjennom-tidene/bekkno-2007.png"
      alt="Bekk.no i 2007"
    />,
    <Image
      key={5}
      width="100vw"
      height="100vh"
      objectFit="cover"
      src="/images/bekkno-gjennom-tidene/bekkno-2012.png"
      alt="Bekk.no i 2012"
    />,
    <Image
      key={6}
      width="100vw"
      height="100vh"
      objectFit="cover"
      src="/images/bekkno-gjennom-tidene/bekkno-2021.png"
      alt="Bekk.no i 2021"
    />,
  ]);
};
