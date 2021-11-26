import React from "react";
import { useSlideshow } from "../useSlideshow";
import { TitleSlide } from "../views/TitleSlide";

export const UtviklervitserLuke = () => {
  return useSlideshow([<TitleSlide key={1}>Utviklervitser!</TitleSlide>]);
};
