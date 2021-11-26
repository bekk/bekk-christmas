import React from "react";
import { useSlideshow } from "../useSlideshow";
import { TitleSlide } from "../views/TitleSlide";

export const HobbyprosjekterLuke = () => {
  return useSlideshow([
    <TitleSlide key={1}>Bekkere sine hobby-prosjekter</TitleSlide>,
  ]);
};
