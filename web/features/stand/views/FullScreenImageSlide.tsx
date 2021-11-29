import { Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

const MotionImage = motion(Image);

let instanceTracker = 0;

type FullScreenImageSlideProps = {
  src: string;
  alt: string;
  animationIndex?: number;
};
export const FullScreenImageSlide = ({
  src,
  alt,
  animationIndex,
}: FullScreenImageSlideProps) => {
  const shouldAnimate = animationIndex !== undefined;
  const rotation = animationIndex % 2 ? 5 : -5;
  return (
    <MotionImage
      width="100vw"
      height="100vh"
      objectFit="cover"
      animate={shouldAnimate ? { scale: 1.2, rotate: rotation } : undefined}
      transition={{ duration: 10 }}
      src={src}
      alt={alt}
    />
  );
};
