import React from "react";
import { useSlideshow } from "../useSlideshow";
import { FullScreenImageSlide } from "../views/FullScreenImageSlide";
import { TitleSlide } from "../views/TitleSlide";

export const AtlasLuke = () => {
  return useSlideshow([
    <TitleSlide key={1}>Atlas </TitleSlide>,
    <FullScreenImageSlide
      key={1}
      src="/images/atlas/atlas-1.png"
      alt="Delingskultur i Bekk"
    />,
    <FullScreenImageSlide
      key={2}
      src="/images/atlas/atlas-2.png"
      alt="I Bekk har vi produsert mer enn 253 foredrag, 1440 artikler, 183 episoder, 21 workshops og delt utallige innlegg"
    />,

  ]);
};
