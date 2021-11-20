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
        bottom={["0%", "-10%", "-20%", "-25%"]}
        left={["-60%", "-40%", "-30%", "-10%"]}
      />
      <Circle
        position="absolute"
        top={["-50%", "-10%", "-30%", "-50%"]}
        right={["5%", "-15%", "-15%", "5%"]}
        width="80vmin"
      />
      <Circle position="absolute" bottom={["-50%"]} right={["-15%"]} />
      <Circle
        position="absolute"
        bottom={["-100%", "-100%", "-100%", "-8%"]}
        right={["5%"]}
        width="60vmin"
        fill="new.darkGreen"
      />
      <Circle
        position="absolute"
        top={["2%", "12%", "3%", "2%"]}
        right={["-3%", "-15%", "-15%", "-3%"]}
        width={["75vmin", "60vmin", "50vmin", "60vmin"]}
        fill="new.salmon"
      />
      <BlobWide
        position="absolute"
        bottom={["45%", "45%", "-15%", "-30%"]}
        left={["-60%", "-60%", "10%", "17%"]}
        width={["120vmin", "120vmin", "80vmin", "80vmin"]}
      />
      <Dots
        position="absolute"
        top={["15%", "8%", "8%", "-0.5%"]}
        left={["5%", "2%", "-1%", "-0.5%"]}
      />
      <BlobThick
        position="absolute"
        top={["-3%", "-20%", "-40%", "-48%"]}
        left={["-40%", "-50%", "-40%", "10%"]}
        width={["100vmin", "95vmin", "90vmin", "85vmin"]}
      />
      <Branch
        position="absolute"
        top={["-1%", "-5%", "-8%", "-10%"]}
        right={["-60%", "-55%", "-45%", "-25%"]}
        width={["130vmin", "115vmin", "100vmin", "85vmin"]}
      />
      <Star
        position="absolute"
        bottom={["-2%", "-5%", "-5%", "5%"]}
        right={["-25%", "-25%", "-25%", "-1%"]}
        width={["50vmin", "50vmin", "40vmin", "20vmin"]}
      />
      <Tree
        position="absolute"
        bottom={["20%", "15%", "10%", "5%"]}
        left={["-15%", "-15%", "-10%", "-5%"]}
        width={["30vmin", "25vmin", "18vmin", "15vmin"]}
      />
      <Squiggle
        position="absolute"
        top={["25%", "25%", "5%", "-7%"]}
        right={["-7%", "-7%", "-10%", "16%"]}
        width={["110vmin", "110vmin", "65vmin", "75vmin"]}
      />

      <Pillar
        position="absolute"
        bottom={["-5%", "-15%", "-15%", "-25%"]}
        left={["-15%", "-5%", "2%", "5%"]}
        fill="#004A33"
      />
      <Pillar
        position="absolute"
        bottom={["-100%", "-100%", "-15%", "-30%"]}
        left={["25%", "25%", "35%", "25%"]}
      />
      <Pillar
        position="absolute"
        bottom={["-2%", "-20%", "-30%", "-30%"]}
        left={["5%", "10%", "5%", "10%"]}
        width={["75vmin", "60vmin", "50vmin", "37vmin"]}
        fill="new.darkGreen"
      />
    </Box>
  );
};
