import React from "react";
import { useSlideshow } from "../useSlideshow";
import { ImageSlide } from "../views/ImageSlide";
import { TextSlide } from "../views/TextSlide";
import { TitleSlide } from "../views/TitleSlide";

export const UtviklervitserLuke = () => {
  return useSlideshow([
    <TitleSlide key={1}>Utviklervitser!</TitleSlide>,
    <TextSlide key={2}>
      "Why do frontend developers eat lunch alone?
      <br />
      They don't know how to join tables."
    </TextSlide>,
    <TextSlide key={3}>
      "Sometimes I think the compiler ignores my comments."
    </TextSlide>,
    <TextSlide key={4}>
      "There are 10 types of people: Those who know binary, and those who
      don't."
    </TextSlide>,
    <TextSlide key={5}>
      "There are two hard problems in computer science:
      <br />- Cache invalidation,
      <br />- naming things
      <br />- and off-by-1 errors."
    </TextSlide>,
    <TextSlide key={6}>
      "Har du hørt om julenissen som sleit med pakketap?"
    </TextSlide>,
    <ImageSlide key={6.5} src="/images/utviklervitser/devjoke-1.jpg" />,
    <TextSlide key={7}>
      "Det er sortering for rest-avfall, men hvor kaster man soap-avfallet?"
    </TextSlide>,
    <TextSlide key={8}>
      "Hvorfor kan ikke jeg sluke, når Rich Harris' Svelte?"
    </TextSlide>,
    <ImageSlide key={6.5} src="/images/utviklervitser/devjoke-2.jpg" />,
    <TextSlide key={9}>
      (jada, vi har uhemmet stjålet disse fra nettet)
    </TextSlide>,
    <TextSlide key={10}>
      "How does fruit like to program? Pear programming."
    </TextSlide>,
    <TextSlide key={11}>
      "Knock knock... Race condition! Who's there?"
    </TextSlide>,
    <TextSlide key={12}>
      "Hva sier frontend-utvikleren på slutten av arbeidsdagen? Vi CSS i
      morgen!"
    </TextSlide>,
    <TextSlide key={13}>
      "A programmer was arrested for writing unreadable code He refused to
      comment"
    </TextSlide>,
    <TextSlide key={14}>"!false (it’s funny cause it’s true)"</TextSlide>,
    <TextSlide key={15}>
      "A programmer walks into a bar and orders 1.000000119 root beers. The
      bartender says, "I'm gonna have to charge you extra; that's a root beer
      float". And the programmer says, "Well in that case make it a double"."
    </TextSlide>,
  ]);
};
