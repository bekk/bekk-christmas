import { Image, Text } from "@chakra-ui/react";
import React from "react";
import { useSlideshow } from "../useSlideshow";
import { TextSlide } from "../views/TextSlide";
import { TitleSlide } from "../views/TitleSlide";

export const UuUtfordringenLuke = () => {
  return useSlideshow([
    <TitleSlide key={1}>UU-utfordringen!</TitleSlide>,
    <TextSlide key={2}>
      <Text fontSize="4xl">
        Universell utforming handler om å gjøre tjenester vi lager tilgjengelig
        for alle, uavhengig av hvilken forutsetning man har. Personer som ser
        dårlig har ofte behov for hjelpemidler som skjermleser og navigering med
        tastatur.
      </Text>
    </TextSlide>,
    <TextSlide key={3}>
      <Text fontSize="4xl" mb="8">
        Klarer du å navigere deg gjennom et skjema, uten å se?
      </Text>
      <Image
        src="/images/uu-utfordringen-qr-code.svg"
        alt="https://skjermleser-stand.herokuapp.com/"
      />
    </TextSlide>,
  ]);
};
