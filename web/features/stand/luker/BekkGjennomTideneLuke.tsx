import { Text } from "@chakra-ui/react";
import React from "react";
import { useSlideshow } from "../useSlideshow";
import { FullScreenImageSlide } from "../views/FullScreenImageSlide";
import { TextSlide } from "../views/TextSlide";
import { TitleSlide } from "../views/TitleSlide";

export const BekkGjennomTideneLuke = () => {
  return useSlideshow([
    <TitleSlide key={1}>Bekk.no gjennom tidene</TitleSlide>,
    <TextSlide key={1.5}>
      <Text>
        Selv om vi har det mye moro, er Bekk et ganske stabilt firma, med solide
        nettsider som varer noen år.
      </Text>
      <Text>
        Nå har vi gravd dypt i arkivet for å se hvordan vi så ut på nettet fra
        starten av!
      </Text>
    </TextSlide>,
    <FullScreenImageSlide
      key={2}
      src="/images/bekkno-gjennom-tidene/bekkno-2000.png"
      alt="Bekk.no i 2000"
    />,
    <FullScreenImageSlide
      key={3}
      src="/images/bekkno-gjennom-tidene/bekkno-2002.png"
      alt="Bekk.no i 2002"
    />,
    <FullScreenImageSlide
      key={4}
      src="/images/bekkno-gjennom-tidene/bekkno-2007.png"
      alt="Bekk.no i 2007"
    />,
    <FullScreenImageSlide
      key={5}
      src="/images/bekkno-gjennom-tidene/bekkno-2012.png"
      alt="Bekk.no i 2012"
    />,
    <FullScreenImageSlide
      key={6}
      src="/images/bekkno-gjennom-tidene/bekkno-2021.png"
      alt="Bekk.no i 2021"
    />,
  ]);
};
