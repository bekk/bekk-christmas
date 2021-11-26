import { Text } from "@chakra-ui/react";
import React from "react";
import { useSlideshow } from "../useSlideshow";
import { TextSlide } from "../views/TextSlide";
import { TitleSlide } from "../views/TitleSlide";

export const RobinTalkLuke = () => {
  return useSlideshow([
    <TitleSlide key={1}>Få med deg Robin sin talk!</TitleSlide>,
    <TextSlide key={2}>
      <Text>Rom 7 @ 09.00</Text>
      <Text>
        <strong>Stabel: A concatenative programming language</strong>
      </Text>
    </TextSlide>,
  ]);
};
