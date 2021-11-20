import { Center } from "@chakra-ui/react";
import React from "react";
import { BlobThick } from "../shapes/BlobThick";
import { BlobWide } from "../shapes/BlobWide";
import { Branch } from "../shapes/Branch";
import { CircleLarge } from "../shapes/CircleLarge";
import { CircleSmall } from "../shapes/CircleSmall";
import { Dots } from "../shapes/Dots";
import { PillarLarge } from "../shapes/PillarLarge";
import { PillarSmall } from "../shapes/PillarSmall";
import { Star } from "../shapes/Star";
import { Squiggle } from "../shapes/Squiggle";
import { Tree } from "../shapes/Tree";

export const TeaserLandingPage = () => {
  return (
    <Center
      height="100vh"
      background="new.darkGreen"
      overflow="hidden"
      position="relative"
    >
      <CircleLarge position="absolute" bottom="-10vh" left="-10vw" />
      <CircleLarge position="absolute" top="-50vh" right="5vw" />
      <CircleLarge position="absolute" bottom="-50vh" right="-15vw" />
      <CircleSmall position="absolute" top="2vh" right="-3vw" />
      <Branch position="absolute" top="-10vh" right="-20vw" />
      <BlobWide position="absolute" bottom="-20vh" left="17vw" />
      <Dots position="absolute" top="0" left="0" />
      <BlobThick position="absolute" top="-42vh" left="10vw" />
      <PillarSmall
        position="absolute"
        bottom="-10vh"
        left="5vw"
        shapeColor="#004A33"
      />
      <PillarSmall position="absolute" bottom="-15vh" left="25vw" />
      <PillarLarge position="absolute" bottom="-20vh" left="10vw" />
      <Star position="absolute" bottom="5vh" right="15vw" />
      <Squiggle position="absolute" top="-5vh" left="45vw" />
      <Tree position="absolute" bottom="0vh" left="-3vw" />
    </Center>
  );
};
