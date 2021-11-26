import React from "react";
import { useSlideshow } from "../useSlideshow";
import { TitleSlide } from "../views/TitleSlide";

export const FagdagsminnerLuke = () => {
  return useSlideshow([<TitleSlide key={1}>Fagdags&shy;minner</TitleSlide>]);
};
