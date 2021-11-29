import { Text } from "@chakra-ui/react";
import React from "react";
import { useSlideshow } from "../useSlideshow";
import { TextSlide } from "../views/TextSlide";
import { TitleSlide } from "../views/TitleSlide";

export const KlistremerkerLuke = () => {
  return useSlideshow([
    <TitleSlide key={1}>Konferansens kuleste klistremerker</TitleSlide>,
    <TextSlide key={2}>
      <Text>
        Lyst til å la laptopen din definere deg? Vi har bestilt{" "}
        <strong>10.000</strong>
        klistremerker fra internettet med alt fra Baby Yoda til Dwight Schrute.
      </Text>
      <Text>
        Ta turen innom og ta med deg et par til laptopen, ladern eller hva du
        vil!
      </Text>
    </TextSlide>,
  ]);
};
