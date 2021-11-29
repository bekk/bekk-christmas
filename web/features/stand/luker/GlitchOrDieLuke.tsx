import { Text } from "@chakra-ui/react";
import React from "react";
import { useSlideshow } from "../useSlideshow";
import { TextSlide } from "../views/TextSlide";
import { TitleSlide } from "../views/TitleSlide";

export const GlitchOrDieLuke = () => {
  return useSlideshow([
    <TitleSlide key={1}>Glitch or Die!</TitleSlide>,
    <TextSlide key={2}>
      <Text>
        Glitch or Die er et spill vi laget før pandemien, som lar deg tegne din
        egen spillebrikke.
      </Text>
      <Text>Kom innom og test det ut!</Text>
    </TextSlide>,
  ]);
};
