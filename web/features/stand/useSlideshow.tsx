import React from "react";
import { LogoSlide } from "./views/LogoSlide";

const MS_TO_SHOW_EACH_SLIDE = 10 * 1000;

export const useSlideshow = (slides: React.ReactNode[]): any => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const slidesWithLogo = [...slides, <LogoSlide key="logo" />];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slidesWithLogo.length);
    }, MS_TO_SHOW_EACH_SLIDE);
    return () => clearInterval(interval);
  }, [slidesWithLogo.length]);

  return slidesWithLogo[currentSlideIndex];
};
