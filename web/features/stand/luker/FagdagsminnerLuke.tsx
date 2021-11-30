import { Box, Text } from "@chakra-ui/react";
import React from "react";
import tp from "timeproxy";
import { useSlideshow } from "../useSlideshow";
import { TextSlide } from "../views/TextSlide";
import { TitleSlide } from "../views/TitleSlide";

export const FagdagsminnerLuke = () => {
  return useSlideshow([
    <TitleSlide key={1}>Fagdagsminner</TitleSlide>,
    <TextSlide key={2}>
      <Text>
        Tre ganger i året tar alle Bekkere seg fri fra prosjekt for å lære nye
        ting, henge med kollegaer og ha det moro.
      </Text>
      <Text>Her er noen klipp fra hvordan det ser ut!</Text>
    </TextSlide>,
    [
      <Box
        key={3}
        as="iframe"
        src="https://player.vimeo.com/video/651274092?h=953ea434b5&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1&amp;loop=1"
        width="100vw"
        height="100vh"
        background="black"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="Stand-video 2021"
        pointerEvents="none"
      />,
      { duration: tp`7 minutes` },
    ],
  ]);
};
