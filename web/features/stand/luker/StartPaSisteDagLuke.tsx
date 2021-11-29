import { Text } from "@chakra-ui/react";
import React from "react";
import { useSlideshow } from "../useSlideshow";
import { TextSlide } from "../views/TextSlide";
import { TitleSlide } from "../views/TitleSlide";

export const StartPaSisteDagLuke = () => {
  return useSlideshow([
    <TitleSlide key={1}>Siste dagen allerede 😱</TitleSlide>,
    <TextSlide key={2}>
      <Text>Fort deg innom for litt kaffe før første sesjon! 👇</Text>
    </TextSlide>,
  ]);
};
