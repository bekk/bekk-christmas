import React from "react";
import { LogoSlide } from "./views/LogoSlide";

export const useSlideshow = (slides: React.ReactNode[]) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const slidesWithLogo = [...slides, <LogoSlide key="logo" />];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slidesWithLogo.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [slidesWithLogo.length]);

  return slidesWithLogo[currentSlideIndex];
};
