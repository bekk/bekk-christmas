import { Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useSlideshow } from "../useSlideshow";
import { TextSlide } from "../views/TextSlide";
import { TitleSlide } from "../views/TitleSlide";

export const TastekonkurranseLuke = () => {
  return useSlideshow([
    <TitleSlide key={1}>Taste-konkurranse!</TitleSlide>,
    <TextSlide key={2}>
      <Stack spacing={4}>
        <Text>
          Tror du at du er den raskeste tastern i Oslo Spektrum? På tide å
          bevise det 👇
        </Text>
        <Image
          src="/images/tastekonkurranse-qr-code.svg"
          alt="
https://priceless-bose-d509cc.netlify.app"
        />
        <Text fontSize="3xl" textAlign="center">
          (vi har en data stående her også)
        </Text>
      </Stack>
    </TextSlide>,
  ]);
};
