import React from "react";
import { useSlideshow } from "../useSlideshow";
import { TextSlide } from "../views/TextSlide";
import { TitleSlide } from "../views/TitleSlide";

export const SjokoladetidLuke = () => {
  return useSlideshow([
    <TitleSlide key={0}>Sjokoladetid! 🍫</TitleSlide>,
    <TextSlide key={1}>Kom og få deg litt sjokolade!</TextSlide>,
  ]);
};
