import { Image } from "@chakra-ui/react";
import React from "react";

type FullScreenImageSlideProps = {
  src: string;
  alt: string;
};
export const FullScreenImageSlide = ({
  src,
  alt,
}: FullScreenImageSlideProps) => {
  return (
    <Image width="100vw" height="100vh" objectFit="cover" src={src} alt={alt} />
  );
};
