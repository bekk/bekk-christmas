import { GridItem, Image, ImageProps } from "@chakra-ui/react";
import { motion } from "framer-motion";
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
      pb={[10, 0]}
      position="relative"
      minWidth={["100%", "368px"]}
    >
      <motion.div
        animate={{ x: [0, 3, 1, -3, 1, 0], rotate: [0, -3, -1, 1, 3, 1, 0] }}
        transition={{ loop: Infinity, duration: 5, delay: index * 0.5 }}
      >
        <Image
          width="100%"
          maxHeight="300px"
          objectFit="contain"
          alt={imageProps.alt /*To avoid an eslint error */}
          {...imageProps}
        />
      </motion.div>
    </GridItem>
  );
};
