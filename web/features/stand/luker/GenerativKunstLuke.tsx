import { Text } from "@chakra-ui/react";
import React from "react";
import tp from "timeproxy";
import { useSlideshow } from "../useSlideshow";
import { GenerativeArtSlide } from "../views/GenerativeArtSlide";
import { TextSlide } from "../views/TextSlide";
import { TitleSlide } from "../views/TitleSlide";

export const GenerativKunstLuke = () => {
  return useSlideshow([
    <TitleSlide key={1}>Generativ kunst!</TitleSlide>,
    <TextSlide key={2}>
      <Text>Lag dine egne generative kunstverk her</Text>
      <Text>Gå til laptopen ved skjermen for å teste det ut selv.</Text>
    </TextSlide>,
    [<GenerativeArtSlide key={3} />, { duration: tp`1 minute` }],
  ]);
};
