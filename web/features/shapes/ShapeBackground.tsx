import React from "react";
import { Box } from "@chakra-ui/react";
import { BlobThick } from "./BlobThick";
import { BlobWide } from "./BlobWide";
import { Branch } from "./Branch";
import { CircleLarge } from "./CircleLarge";
import { CircleSmall } from "./CircleSmall";
import { Dots } from "./Dots";
import { PillarLarge } from "./PillarLarge";
import { PillarSmall } from "./PillarSmall";
import { Star } from "./Star";
import { Squiggle } from "./Squiggle";
import { Tree } from "./Tree";

export const ShapeBackground = () => {
  return (
    <Box
      position="absolute"
      top="0"
      left="0"
      width="100vw"
      minHeight="100vh"
      height="100%"
      background="new.darkGreen"
      overflow="hidden"
      zIndex="-1"
    >
      <CircleLarge position="absolute" bottom="-10%" left="-10%" />
      <CircleLarge position="absolute" top="-50%" right="5%" />
      <CircleLarge position="absolute" bottom="-50%" right="-15%" />
      <CircleSmall position="absolute" top="2%" right="-3%" />
      <Branch position="absolute" top="-10%" right="-20%" />
      <BlobWide position="absolute" bottom="-20%" left="17%" />
      <Dots position="absolute" top="0" left="0" />
      <BlobThick position="absolute" top="-42%" left="10%" />
      <PillarSmall position="absolute" bottom="-10%" left="5%" fill="#004A33" />
      <PillarSmall position="absolute" bottom="-15%" left="25%" />
      <PillarLarge position="absolute" bottom="-20%" left="10%" />
      <Star position="absolute" bottom="5%" right="15%" />
      <Squiggle position="absolute" top="-5%" left="45%" />
      <Tree position="absolute" bottom="0%" left="-3%" />
    </Box>
  );
};
