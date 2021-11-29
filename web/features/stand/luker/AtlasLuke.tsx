import React from "react";
import { useSlideshow } from "../useSlideshow";
import { FullScreenImageSlide } from "../views/FullScreenImageSlide";

export const AtlasLuke = () => {
  return useSlideshow([
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
    <FullScreenImageSlide
      key={3}
      src="/images/atlas/atlas-3.png"
      alt="Alt er samlet i Atlas …Bekk sin nye fag- og delingsplattform"
    />,
    <FullScreenImageSlide
      key={4}
      src="/images/atlas/atlas-4.png"
      alt="blogg.bekk.no, bekk.christmas, vimeo.com/bekk, Bekk Open Podcast, Bekk 1:1 Podcast, Drypp Podcast"
    />,
    <FullScreenImageSlide
      key={5}
      src="/images/atlas/atlas-5.png"
      alt="Bekk har delt og produsert mange tusen faglige bidrag: tusener av bloggposter, hundrevis av foredrag og podcastepisoder. "
    />,
    <FullScreenImageSlide
      key={6}
      src="/images/atlas/atlas-6.png"
      alt="Alt er samlet i Atlas - Bekk sin nye fag- og delingsplattform"
    />,
  ]);
};
