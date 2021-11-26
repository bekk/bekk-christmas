import React from "react";
import { useSlideshow } from "../useSlideshow";
import { TitleSlide } from "../views/TitleSlide";

export const GlitchOrDieLuke = () => {
  return useSlideshow([<TitleSlide key={1}>Glitch or Die!</TitleSlide>]);
};
