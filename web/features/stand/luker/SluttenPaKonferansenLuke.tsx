import { Text } from "@chakra-ui/react";
import React from "react";
import { useSlideshow } from "../useSlideshow";
import { TextSlide } from "../views/TextSlide";
import { TitleSlide } from "../views/TitleSlide";

export const SluttenPaKonferansenLuke = () => {
  return useSlideshow([
    <TitleSlide key={1}>Takk for i år NDC!</TitleSlide>,
    <TextSlide key={2}>
      <Text>Det var fantastisk å se dere igjen 😻</Text>
      <Text>Interessert i å jobbe hos oss? Sjekk bekk.no/jobb!</Text>
    </TextSlide>,
  ]);
};
