import React from "react";
import tp from "timeproxy";
import { useInterval } from "@chakra-ui/react";
import { LogoSlide } from "./views/LogoSlide";

const DEFAULT_DURATION = tp`two seconds`;

/** Show your slides with this useful little bugger
 *
 * You should specify a list of "slides" to iterate through, where each of them is a JSX tag. Or alternatively, you can specify an array, with the component as the first item, and an options object as the second item.
 *
 * @example
 * useSlideshow([
 *   <TitleSlide>Hi there</TitleSlide>,
 *   [<LongLivedSlide />, { duration: 60000 }]
 * ])
 */
export const useSlideshow = (
  slides: (React.ReactNode | [React.ReactNode, { duration: number }])[]
): any => {
  const [duration, setDuration] = React.useState(DEFAULT_DURATION);
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const slidesWithLogo = React.useMemo(
    () => [...slides, <LogoSlide key="logo" />],
    [slides]
  );

  const slideToShow = React.useMemo(
    () => slidesWithLogo[currentSlideIndex],
    [currentSlideIndex, slidesWithLogo]
  );

  useInterval(() => {
    const nextIndex = (currentSlideIndex + 1) % slidesWithLogo.length;
    setCurrentSlideIndex(nextIndex);
  }, duration);

  const nextDuration = slideToShow[1]
    ? slideToShow[1].duration
    : DEFAULT_DURATION;

  React.useEffect(() => {
    setDuration(nextDuration);
  }, [nextDuration]);

  return Array.isArray(slideToShow) ? slideToShow[0] : slideToShow;
};
