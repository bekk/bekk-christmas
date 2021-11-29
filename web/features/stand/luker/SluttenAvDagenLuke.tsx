import { Text } from "@chakra-ui/react";
import React from "react";
import { useSlideshow } from "../useSlideshow";
import { TextSlide } from "../views/TextSlide";
import { TitleSlide } from "../views/TitleSlide";

export const SluttenAvDagenLuke = () => {
  return useSlideshow([
    <TitleSlide key={1}>Takk for i dag!</TitleSlide>,
    <TextSlide key={2}>
      <Text>
        Dagen er over, men heldigvis er det mer moro i morgen. På gjensyn!
      </Text>
    </TextSlide>,
  ]);
};
