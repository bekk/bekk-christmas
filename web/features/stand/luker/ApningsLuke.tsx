import React from 'react';
import { useSlideshow } from '../useSlideshow';
import { TextSlide } from '../views/TextSlide';
import { TitleSlide } from '../views/TitleSlide';

export const ApningsLuke = () => {
  return useSlideshow([
    <TitleSlide key={1}>Ha en flott dag på NDC</TitleSlide>,
    <TextSlide key={2}>
      Ta med deg bolle og kaffe til første foredrag! 👇
    </TextSlide>,
  ]);
}