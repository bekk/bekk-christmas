import React from "react";
import { useSlideshow } from "../useSlideshow";
import { TextSlide } from "../views/TextSlide";
import { TitleSlide } from "../views/TitleSlide";

export const BekkGjennomTideneLuke = () => {
  return useSlideshow([
    <TitleSlide key={1}>Bekk gjennom tidene</TitleSlide>,
    <TextSlide key={2}>
      <strong>Bekk er 21 år i år.</strong> Her er en liten historie om hvordan
      vi har blitt de vi er.
    </TextSlide>,
  ]);
};
