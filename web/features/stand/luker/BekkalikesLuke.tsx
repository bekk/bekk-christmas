import { Image } from "@chakra-ui/react";
import React from "react";
import { useSlideshow } from "../useSlideshow";
import { BekkalikeSlide } from "../views/BekkalikeSlide";
import { TitleSlide } from "../views/TitleSlide";

export const BekkalikesLuke = () => {
  return useSlideshow([
    <TitleSlide key={1}>Bekk-a-likes</TitleSlide>,
    <BekkalikeSlide key={2} title="Kieran Culkin || August Dahl">
      <Image src="/images/bekk-a-likes/01-both.png" alt="" />
    </BekkalikeSlide>,
    <BekkalikeSlide key={3} title="Andrew Garfield || Bendik Edvardsen">
      <Image src="/images/bekk-a-likes/02-both.png" alt="" />
    </BekkalikeSlide>,
    <BekkalikeSlide key={4} title="Adam Conover || Didrik Sæther">
      <Image src="/images/bekk-a-likes/03-celeb.png" alt="" />
      <Image src="/images/bekk-a-likes/03-bekker.png" alt="" />
    </BekkalikeSlide>,
    <BekkalikeSlide key={5} title="Seeb || Erik Wendel">
      <Image src="/images/bekk-a-likes/04-both.png" alt="" />
    </BekkalikeSlide>,
    <BekkalikeSlide
      key={6}
      title="Bølle-til-bestevenn-Marie || Vikki Walle-Hansen"
    >
      <Image src="/images/bekk-a-likes/05-celeb.png" alt="" />
      <Image src="/images/bekk-a-likes/05-bekker.png" alt="" />
    </BekkalikeSlide>,
    <BekkalikeSlide key={7} title="Rufus Sewell || Håvard Hvassing">
      <Image src="/images/bekk-a-likes/06-both.png" alt="" />
    </BekkalikeSlide>,
    <BekkalikeSlide key={8} title="Pewdiepie || Jøran Vagnby Lillesand">
      <Image src="/images/bekk-a-likes/07-celeb.png" alt="" />
      <Image src="/images/bekk-a-likes/07-bekker.png" alt="" />
    </BekkalikeSlide>,
    <BekkalikeSlide key={9} title="Andreas Wahl || Andreas Heim">
      <Image src="/images/bekk-a-likes/08-celeb.png" alt="" />
      <Image src="/images/bekk-a-likes/08-bekker.png" alt="" />
    </BekkalikeSlide>,
    <BekkalikeSlide key={10} title="Ryan Gosling || Herman Slyngstadli">
      <Image src="/images/bekk-a-likes/09-both.png" alt="" />
    </BekkalikeSlide>,
  ]);
};
