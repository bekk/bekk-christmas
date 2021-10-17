import { GridItem, Image, ImageProps } from "@chakra-ui/react";
import React from "react";
import { colorCombinations } from "./color-combinations";


export type ArtworkPostType = ImageProps & {
  _type: "artwork";
  src: string;
  alt: string;
};

type ArtworkItemProps = {
  post: ArtworkPostType;
  index: number;
};
export const ArtworkItem = ({ index, post }: ArtworkItemProps) => {
  const { _type, ...imageProps } = post;
  return (
    <GridItem
      backgroundColor={
        colorCombinations[index % colorCombinations.length].background
      }
      color={colorCombinations[index % colorCombinations.length].foreground}
      px={10}
      position="relative"
      minWidth={["100%", "368px"]}
    >
      <Image
        width="100%"
        maxHeight="300px"
        objectFit="contain"
        alt={imageProps.alt /*To avoid an eslint error */}
        {...imageProps}
      />
    </GridItem>
  );
};


