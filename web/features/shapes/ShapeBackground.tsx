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
      <Circle
        position="absolute"
        bottom={["0%", "-10%"]}
        left={["-60%", "-10%"]}
      />
      <Circle
        position="absolute"
        top={["-50%"]}
        right={["5%"]}
        width="80vmin"
      />
      <Circle position="absolute" bottom={["-50%"]} right={["-15%"]} />
      <Circle
        position="absolute"
        bottom={["-100%", "-8%"]}
        right={["5%"]}
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
      <BlobWide
        position="absolute"
        bottom={["45%", "-15%"]}
        left={["-60%", "17%"]}
        width={["120vmin", "80vmin"]}
      />
      <Dots position="absolute" top={["15%", "-0.5%"]} left={["5%", "-0.5%"]} />
      <BlobThick
        position="absolute"
        top={["-3%", "-48%"]}
        left={["-40%", "10%"]}
        width={["100vmin", "85vmin"]}
      />
      <Branch
        position="absolute"
        top={["-1%", "-10%"]}
        right={["-60%", "-22%"]}
        width={["130vmin", "85vmin"]}
      />
      <Star
        position="absolute"
        bottom={["-2%", "5%"]}
        right={["-25%", "-1%"]}
        width={["50vmin", "20vmin"]}
      />
      <Squiggle
        position="absolute"
        top={["25%", "-7%"]}
        right={["-7%", "12%"]}
        width={["110vmin", "75vmin"]}
      />
      <Pillar
        position="absolute"
        bottom={["-5%", "-20%"]}
        left={["-15%", "5%"]}
        fill="#004A33"
      />
      <Pillar position="absolute" bottom={["-15%"]} left={["25%"]} />
      <Pillar
        position="absolute"
        bottom={["-2%", "-20%"]}
        left={["5%", "10%"]}
        width={["75vmin", "37vmin"]}
        fill="new.darkGreen"
      />
      <Tree
        position="absolute"
        bottom={["20%", "5%"]}
        left={["-15%", "-5%"]}
        width={["30vmin", "15vmin"]}
      />
    </Box>
  );
};
