import { Box } from "@chakra-ui/react";
import React from "react";
import { getGreyNote } from "../../utils/color";
import { BlobThick } from "./BlobThick";
import { BlobWide } from "./BlobWide";
import { Branch } from "./Branch";
import { Circle } from "./Circle";
import { Dots } from "./Dots";
import { Pillar } from "./Pillar";
import { Squiggle } from "./Squiggle";
import { Star } from "./Star";
import { Tree } from "./Tree";

export const ShapeBackground = ({
  isFullPage = false,
  isBlackAndWhite = false,
}: {
  isFullPage?: boolean;
  isBlackAndWhite?: boolean;
}) => {
  return (
    <Box
      position="absolute"
      top="0"
      left="0"
      width="100vw"
      minHeight="100vh"
      height="100%"
      background={isBlackAndWhite ? "#000" : "brand.darkGreen"}
      overflow="hidden"
      zIndex="-1"
    >
      <Circle
        position="absolute"
        bottom={[
          isFullPage ? "-80%" : "0%",
          isFullPage ? "-80%" : "-10%",
          "-20%",
          "-25%",
        ]}
        left={[
          isFullPage ? "-100%" : "-60%",
          isFullPage ? "-100%" : "-40%",
          "-30%",
          "-10%",
        ]}
        fill={isBlackAndWhite ? getGreyNote(14, 3) : "brand.lightGreen"}
      />
      <Circle
        position="absolute"
        top={["-100%", "-100%", "-30%", "-50%"]}
        right={["5%", "-15%", "-15%", "5%"]}
        width="80vmin"
        fill={isBlackAndWhite ? getGreyNote(14, 6) : "brand.lightGreen"}
      />
      <Circle
        position="absolute"
        bottom={[
          isFullPage ? "80%" : "90%",
          isFullPage ? "80%" : "90%",
          "-50%",
          "-50%",
        ]}
        right={["-15%", isFullPage ? "-25%" : "-15%", "-15%", "-15%"]}
        fill={isBlackAndWhite ? getGreyNote(14, 7) : "brand.lightGreen"}
      />
      <Circle
        position="absolute"
        top={[
          isFullPage ? "-15%" : "-5%",
          isFullPage ? "-15%" : "-20%",
          "-20%",
          "-20%",
        ]}
        right={[
          isFullPage ? "-25%" : "-15%",
          isFullPage ? "-25%" : "-15%",
          "-15%",
          "-5%",
        ]}
        width={["90vmin", "60vmin", "50vmin", "60vmin"]}
        fill={isBlackAndWhite ? getGreyNote(14, 4) : "brand.salmon"}
      />
      <BlobWide
        position="absolute"
        bottom={[
          isFullPage ? "35%" : "45%",
          isFullPage ? "35%" : "45%",
          "-15%",
          "-30%",
        ]}
        left={[
          isFullPage ? "-80%" : "-60%",
          isFullPage ? "-80%" : "-60%",
          "10%",
          "17%",
        ]}
        width={[
          isFullPage ? "110vmin" : "120vmin",
          isFullPage ? "110vmin" : "120vmin",
          "80vmin",
          "80vmin",
        ]}
        fill={isBlackAndWhite ? getGreyNote(14, 1) : "brand.peach"}
      />
      <Dots
        position="absolute"
        top={["10%", "8%", "8%", "15%"]}
        left={["5%", "2%", "-1%", "5%"]}
        width={["30vmin"]}
        fill={isBlackAndWhite ? getGreyNote(14, 11) : "brand.peach"}
      />
      <BlobThick
        position="absolute"
        top={[
          isFullPage ? "-20%" : "60%",
          isFullPage ? "-28%" : "-20%",
          isFullPage ? "-30%" : "-30%",
          "-50%",
        ]}
        left={[
          isFullPage ? "-35%" : "70%",
          isFullPage ? "-60%" : "-60%",
          "-40%",
          "-15%",
        ]}
        width={["80vmin", "95vmin", "80vmin", "85vmin"]}
        fill={isBlackAndWhite ? getGreyNote(14, 3) : "brand.yellow"}
      />
      <Branch
        position="absolute"
        top={["-1%", "-5%", "-8%", "-10%"]}
        right={[
          isFullPage ? "-55%" : "-30%",
          isFullPage ? "-50%" : "-55%",
          "-45%",
          "-25%",
        ]}
        width={[
          isFullPage ? "110vmin" : "130vmin",
          isFullPage ? "100vmin" : "115vmin",
          "100vmin",
          "85vmin",
        ]}
        fill={isBlackAndWhite ? getGreyNote(14, 7) : "brand.darkGreen"}
      />
      <Star
        position="absolute"
        bottom={[isFullPage ? "-10%" : "-2%", "-5%", "-5%", "-5%"]}
        right={[isFullPage ? "-20%" : "-25%", "-25%", "-25%", "-5%"]}
        width={["50vmin", "50vmin", "40vmin", "40vmin"]}
        fill={isBlackAndWhite ? getGreyNote(14, 13) : "brand.yellow"}
      />
      <Tree
        position="absolute"
        bottom={["20%", "15%", "10%", "5%"]}
        left={["-15%", isFullPage ? "-12%" : "-15%", "-10%", "-5%"]}
        width={["30vmin", isFullPage ? "20vmin" : "25vmin", "18vmin", "15vmin"]}
        fill={isBlackAndWhite ? getGreyNote(14, 7) : "brand.darkGreen"}
      />
      <Squiggle
        position="absolute"
        top={[
          isFullPage ? "10%" : "25%",
          isFullPage ? "5%" : "25%",
          "5%",
          "-7%",
        ]}
        right={[
          isFullPage ? "-20%" : "-7%",
          isFullPage ? "-20%" : "-7%",
          "-10%",
          "16%",
        ]}
        width={[
          isFullPage ? "90vmin" : "110vmin",
          isFullPage ? "70vmin" : "110vmin",
          "65vmin",
          "75vmin",
        ]}
        fill={isBlackAndWhite ? getGreyNote(14, 3) : "brand.red"}
      />
      <Pillar
        position="absolute"
        bottom={[
          isFullPage ? "-40%" : "-5%",
          isFullPage ? "-30%" : "-15%",
          isFullPage ? "-20%" : "-15%",
          "-25%",
        ]}
        left={[
          isFullPage ? "-5%" : "-15%",
          isFullPage ? "10%" : "-5%",
          "2%",
          "5%",
        ]}
        fill={isBlackAndWhite ? getGreyNote(14, 7) : "#004A33"}
      />
      <Pillar
        position="absolute"
        bottom={["-100%", "-100%", isFullPage ? "-25%" : "-15%", "-30%"]}
        left={["25%", "25%", "25%", "25%"]}
        fill={isBlackAndWhite ? getGreyNote(14, 6) : "brand.lightGreen"}
      />
      <Pillar
        position="absolute"
        bottom={[isFullPage ? "-20%" : "-2%", "-20%", "-30%", "-30%"]}
        left={[
          isFullPage ? "15%" : "5%",
          isFullPage ? "20%" : "10%",
          "5%",
          "10%",
        ]}
        width={[
          isFullPage ? "50vmin" : "75vmin",
          isFullPage ? "40vmin" : "60vmin",
          isFullPage ? "40vmin" : "50vmin",
          "37vmin",
        ]}
        fill={isBlackAndWhite ? getGreyNote(14, 8) : "brand.darkGreen"}
      />
    </Box>
  );
};
