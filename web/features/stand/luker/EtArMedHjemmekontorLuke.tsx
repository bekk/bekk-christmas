import React from "react";
import { useSlideshow } from "../useSlideshow";
import { TitleSlide } from "../views/TitleSlide";

export const EtArMedHjemmekontorLuke = () => {
  return useSlideshow([
    <TitleSlide key={1}>Et år med hjemme-kontor</TitleSlide>,
  ]);
};
