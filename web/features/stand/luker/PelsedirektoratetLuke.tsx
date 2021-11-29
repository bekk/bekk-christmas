import { Text } from "@chakra-ui/react";
import React from "react";
import { useSlideshow } from "../useSlideshow";
import { FullScreenImageSlide } from "../views/FullScreenImageSlide";
import { TextSlide } from "../views/TextSlide";
import { TitleSlide } from "../views/TitleSlide";

export const PelsedirektoratetLuke = () => {
  return useSlideshow([
    <TitleSlide key={1}>#pelse-direktoratet</TitleSlide>,
    <TextSlide key={2}>
      <Text>
        Et år på hjemmekontor ga oss alle muligheten til å bli bedre kjent med
        våre mer lodne venner 🐶🐱🐰
      </Text>
      <Text>Og nå er det på tide at dere får hilse på dem også 🥰</Text>
    </TextSlide>,
    <FullScreenImageSlide
      key={10}
      src="/images/pelsedirektoratet/dyr-01.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={20}
      src="/images/pelsedirektoratet/dyr-02.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={30}
      src="/images/pelsedirektoratet/dyr-03.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={40}
      src="/images/pelsedirektoratet/dyr-04.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={50}
      src="/images/pelsedirektoratet/dyr-05.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={60}
      src="/images/pelsedirektoratet/dyr-06.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={70}
      src="/images/pelsedirektoratet/dyr-07.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={80}
      src="/images/pelsedirektoratet/dyr-08.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={90}
      src="/images/pelsedirektoratet/dyr-09.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={100}
      src="/images/pelsedirektoratet/dyr-10.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <TitleSlide key={1123}>#pelse-direktoratet</TitleSlide>,
    <FullScreenImageSlide
      key={110}
      src="/images/pelsedirektoratet/dyr-11.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={120}
      src="/images/pelsedirektoratet/dyr-12.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={130}
      src="/images/pelsedirektoratet/dyr-13.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={140}
      src="/images/pelsedirektoratet/dyr-14.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={150}
      src="/images/pelsedirektoratet/dyr-15.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={160}
      src="/images/pelsedirektoratet/dyr-16.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={170}
      src="/images/pelsedirektoratet/dyr-17.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={180}
      src="/images/pelsedirektoratet/dyr-18.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={190}
      src="/images/pelsedirektoratet/dyr-19.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <TitleSlide key={2318371}>#pelse-direktoratet</TitleSlide>,
    <FullScreenImageSlide
      key={200}
      src="/images/pelsedirektoratet/dyr-20.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={210}
      src="/images/pelsedirektoratet/dyr-21.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={220}
      src="/images/pelsedirektoratet/dyr-22.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={230}
      src="/images/pelsedirektoratet/dyr-23.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={240}
      src="/images/pelsedirektoratet/dyr-24.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={250}
      src="/images/pelsedirektoratet/dyr-25.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={260}
      src="/images/pelsedirektoratet/dyr-26.jpg"
      alt="Søteste lille loffe-doffen"
    />,
    <FullScreenImageSlide
      key={270}
      src="/images/pelsedirektoratet/dyr-27.jpg"
      alt="Søteste lille loffe-doffen"
    />,
  ]);
};
