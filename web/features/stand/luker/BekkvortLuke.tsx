import { Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import tp from "timeproxy";
import { useSlideshow } from "../useSlideshow";
import { TextSlide } from "../views/TextSlide";
import { TitleSlide } from "../views/TitleSlide";

export const BekkvortLuke = () => {
  return useSlideshow([
    <TitleSlide key={1}>Velkommen til Bekkvort 🧙‍♀️</TitleSlide>,
    <TextSlide key={2}>
      <Text>
        Corona var kjipt, men godt for kreativiteten. Derfor satt vi oss ned og
        laget et helt digitalt escape room, for å holde stemningen oppe.
      </Text>
    </TextSlide>,
    [
      <TextSlide key={3}>
        <Stack>
          <Text>
            Bli med inn i en Harry Potter-inspirert verden, laget av Bekk.
          </Text>
          <Text>Gå til bekkvort.com</Text>
        </Stack>
        <Image
          src="/images/bekkvort-qr-code.svg"
          alt="https://bekkvort.com"
          mt={8}
        />
      </TextSlide>,
      { duration: tp`1 minute` },
    ],
  ]);
};
