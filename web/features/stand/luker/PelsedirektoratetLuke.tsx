import { Text } from "@chakra-ui/react";
import React from "react";
import { useSlideshow } from "../useSlideshow";
import { FullScreenImageSlide } from "../views/FullScreenImageSlide";
import { TextSlide } from "../views/TextSlide";
import { TitleSlide } from "../views/TitleSlide";

export const PelsedirektoratetLuke = () => {
  return useSlideshow([
    <TitleSlide key={1}>#pelsedirektoratet</TitleSlide>,
    <TextSlide key={2}>
      <Text>
        Et år på hjemmekontor ga oss alle muligheten til å bli bedre kjent med
        våre mer lodne venner 🐶🐱🐰
      </Text>
      <Text>Og nå er det på tide at dere får hilse på dem også 🥰</Text>
    </TextSlide>,
    <FullScreenImageSlide
      key={3}
      animationIndex={3}
      src="/images/pelsedirektoratet/dyr-01.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={4}
      animationIndex={4}
      src="/images/pelsedirektoratet/dyr-02.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={5}
      animationIndex={5}
      src="/images/pelsedirektoratet/dyr-03.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={6}
      animationIndex={6}
      src="/images/pelsedirektoratet/dyr-04.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={7}
      animationIndex={7}
      src="/images/pelsedirektoratet/dyr-05.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={7}
      animationIndex={7}
      src="/images/pelsedirektoratet/dyr-06.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={8}
      animationIndex={8}
      src="/images/pelsedirektoratet/dyr-07.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={9}
      animationIndex={9}
      src="/images/pelsedirektoratet/dyr-08.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={10}
      animationIndex={10}
      src="/images/pelsedirektoratet/dyr-09.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={11}
      animationIndex={11}
      src="/images/pelsedirektoratet/dyr-10.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <TitleSlide key={-1337}>#pelse-direktoratet</TitleSlide>,
    <FullScreenImageSlide
      key={12}
      animationIndex={12}
      src="/images/pelsedirektoratet/dyr-11.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={13}
      animationIndex={13}
      src="/images/pelsedirektoratet/dyr-12.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={14}
      animationIndex={14}
      src="/images/pelsedirektoratet/dyr-13.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={15}
      animationIndex={15}
      src="/images/pelsedirektoratet/dyr-14.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={16}
      animationIndex={16}
      src="/images/pelsedirektoratet/dyr-15.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={17}
      animationIndex={17}
      src="/images/pelsedirektoratet/dyr-16.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={18}
      animationIndex={18}
      src="/images/pelsedirektoratet/dyr-17.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={19}
      animationIndex={19}
      src="/images/pelsedirektoratet/dyr-18.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={20}
      animationIndex={20}
      src="/images/pelsedirektoratet/dyr-19.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <TitleSlide key={2318371}>#pelse-direktoratet</TitleSlide>,
    <FullScreenImageSlide
      key={21}
      animationIndex={21}
      src="/images/pelsedirektoratet/dyr-20.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={22}
      animationIndex={22}
      src="/images/pelsedirektoratet/dyr-21.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={23}
      animationIndex={23}
      src="/images/pelsedirektoratet/dyr-22.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={24}
      animationIndex={24}
      src="/images/pelsedirektoratet/dyr-23.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={25}
      animationIndex={25}
      src="/images/pelsedirektoratet/dyr-24.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={26}
      animationIndex={26}
      src="/images/pelsedirektoratet/dyr-25.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={27}
      animationIndex={27}
      src="/images/pelsedirektoratet/dyr-26.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={28}
      animationIndex={28}
      src="/images/pelsedirektoratet/dyr-27.jpg"
      alt="Søteste lille loffe-doffen"
    />,
  ]);
};
