import { Text } from "@chakra-ui/react";
import React from "react";
import { useSlideshow } from "../useSlideshow";
import { FullScreenImageSlide } from "../views/FullScreenImageSlide";
import { TextSlide } from "../views/TextSlide";
import { TitleSlide } from "../views/TitleSlide";

export const LivetIBekkLuke = () => {
  return useSlideshow([
    <TitleSlide key={-1}>#livetibekk 👌</TitleSlide>,
    <TextSlide key={0}>
      <Text>
        Livet i Bekk er ikke bare progging og design sprints.{" "}
        <strong>Livet i Bekk er mer enn fag.</strong>
      </Text>
      <Text>
        Det er topptur, Trysil-tur, sykkeltur, kanotur, juletrefest og en og
        annen tur på byen. Her er noen høydepunkter! 🌤️
      </Text>
    </TextSlide>,
    <FullScreenImageSlide
      key={1}
      animationIndex={1}
      src="/images/livet-i-bekk/lib-01.jpg"
      alt=""
    />,
    <FullScreenImageSlide
      key={2}
      animationIndex={2}
      src="/images/livet-i-bekk/lib-02.jpg"
      alt=""
    />,
    <FullScreenImageSlide
      key={3}
      animationIndex={3}
      src="/images/livet-i-bekk/lib-03.jpg"
      alt=""
    />,
    <FullScreenImageSlide
      key={4}
      animationIndex={4}
      src="/images/livet-i-bekk/lib-04.jpg"
      alt=""
    />,
    <FullScreenImageSlide
      key={5}
      animationIndex={5}
      src="/images/livet-i-bekk/lib-05.jpg"
      alt=""
    />,
    <FullScreenImageSlide
      key={6}
      animationIndex={6}
      src="/images/livet-i-bekk/lib-06.jpg"
      alt=""
    />,
    <FullScreenImageSlide
      key={7}
      animationIndex={7}
      src="/images/livet-i-bekk/lib-07.jpg"
      alt=""
    />,
    <FullScreenImageSlide
      key={8}
      animationIndex={8}
      src="/images/livet-i-bekk/lib-08.jpg"
      alt=""
    />,
    <FullScreenImageSlide
      key={9}
      animationIndex={9}
      src="/images/livet-i-bekk/lib-09.jpg"
      alt=""
    />,
    <FullScreenImageSlide
      key={10}
      animationIndex={10}
      src="/images/livet-i-bekk/lib-10.jpg"
      alt=""
    />,
    <FullScreenImageSlide
      key={11}
      animationIndex={11}
      src="/images/livet-i-bekk/lib-11.jpg"
      alt=""
    />,
    <FullScreenImageSlide
      key={12}
      animationIndex={12}
      src="/images/livet-i-bekk/lib-12.jpg"
      alt=""
    />,
    <FullScreenImageSlide
      key={13}
      animationIndex={13}
      src="/images/livet-i-bekk/lib-13.jpg"
      alt=""
    />,
    <FullScreenImageSlide
      key={14}
      animationIndex={14}
      src="/images/livet-i-bekk/lib-14.jpg"
      alt=""
    />,
    <FullScreenImageSlide
      key={15}
      animationIndex={15}
      src="/images/livet-i-bekk/lib-15.jpg"
      alt=""
    />,
    <FullScreenImageSlide
      key={16}
      animationIndex={16}
      src="/images/livet-i-bekk/lib-16.jpg"
      alt=""
    />,
    <FullScreenImageSlide
      key={17}
      animationIndex={17}
      src="/images/livet-i-bekk/lib-17.jpg"
      alt=""
    />,
    <FullScreenImageSlide
      key={18}
      animationIndex={18}
      src="/images/livet-i-bekk/lib-18.jpg"
      alt=""
    />,
    <FullScreenImageSlide
      key={19}
      animationIndex={19}
      src="/images/livet-i-bekk/lib-19.jpg"
      alt=""
    />,
    <FullScreenImageSlide
      key={20}
      animationIndex={20}
      src="/images/livet-i-bekk/lib-20.jpg"
      alt=""
    />,
    <FullScreenImageSlide
      key={21}
      animationIndex={21}
      src="/images/livet-i-bekk/lib-21.jpg"
      alt=""
    />,
    <FullScreenImageSlide
      key={22}
      animationIndex={22}
      src="/images/livet-i-bekk/lib-22.jpg"
      alt=""
    />,
  ]);
};
