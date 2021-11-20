import React from "react";
import { Box } from "@chakra-ui/react";
import { BlobThick } from "./BlobThick";
import { BlobWide } from "./BlobWide";
import { Branch } from "./Branch";
import { Dots } from "./Dots";
import { Pillar } from "./Pillar";
import { Star } from "./Star";
import { Squiggle } from "./Squiggle";
import { Tree } from "./Tree";
import { Circle } from "./Circle";

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
      <Circle position="absolute" bottom="-10%" left="-10%" />
      <Circle position="absolute" top="-50%" right="5%" width="80vmin" />
      <Circle position="absolute" bottom="-50%" right="-15%" />
      <Circle
        position="absolute"
        bottom="-8%"
        right="5%"
        width="60vmin"
        fill="new.darkGreen"
      />
      <Circle
        position="absolute"
        top="2%"
        right="-3%"
        width="75vmin"
        fill="new.salmon"
      />
      <Branch position="absolute" top="-10%" right="-22%" width="85vmin" />
      <BlobWide position="absolute" bottom="-20%" left="17%" width="80vmin" />
      <Dots position="absolute" top="-0.5%" left="-0.5%" />
      <BlobThick position="absolute" top="-48%" left="10%" width="85vmin" />
      <Pillar position="absolute" bottom="-20%" left="5%" fill="#004A33" />
      <Pillar position="absolute" bottom="-15%" left="25%" />
      <Pillar
        position="absolute"
        bottom="-20%"
        left="10%"
        width="37vmin"
        fill="new.darkGreen"
      />
      <Star position="absolute" bottom="5%" right="-1%" width="20vmin" />
      <Squiggle position="absolute" top="-7%" right="12%" width="75vmin" />
      <Tree position="absolute" bottom="5%" left="-5%" width="15vmin" />
    </Box>
  );
};
