import { useInterval } from "@chakra-ui/react";
import React from "react";
import tp from "timeproxy";
import Calendar from "../calendar/Calendar";
import { LogoSlide } from "./views/LogoSlide";

const DEFAULT_DURATION = tp`ten seconds`;

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
    () => [
      ...slides,
      <LogoSlide key="logo" />,
      <Calendar key="calendar" year={2021} />,
    ],
    [slides]
  );
  const goToNextSlide = () =>
    setCurrentSlideIndex((prev) => (prev + 1) % slidesWithLogo.length);

  const slideToShow = React.useMemo(
    () => slidesWithLogo[currentSlideIndex],
    [currentSlideIndex, slidesWithLogo]
  );

  useInterval(() => {
    goToNextSlide();
  }, duration);

  const nextDuration = slideToShow[1]
    ? slideToShow[1].duration
    : DEFAULT_DURATION;

  React.useEffect(() => {
    setDuration(nextDuration);
  }, [nextDuration]);

  useGlobalClickHandler(goToNextSlide);

  return Array.isArray(slideToShow) ? slideToShow[0] : slideToShow;
};

const useGlobalClickHandler = (callback: () => void) => {
  const callbackRef = React.useRef<() => void>(callback);
  React.useEffect(() => {
    const handleClick = () => callbackRef.current();
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);
};
