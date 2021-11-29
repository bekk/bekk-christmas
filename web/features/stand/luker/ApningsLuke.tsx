import { Text } from "@chakra-ui/react";
import React from "react";
import { useSlideshow } from "../useSlideshow";
import { TextSlide } from "../views/TextSlide";
import { TitleSlide } from "../views/TitleSlide";

export const ApningsLuke = () => {
  return useSlideshow([
    <TitleSlide key={1}>Ha en flott første dag på NDC! 🤩</TitleSlide>,
    <TextSlide key={2}>
      <Text>Ta med deg en sjokoladebit og kaffe til første foredrag! 👇</Text>
    </TextSlide>,
  ]);
};
