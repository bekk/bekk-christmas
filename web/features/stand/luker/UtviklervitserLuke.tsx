import { Text } from "@chakra-ui/react";
import React from "react";
import { useSlideshow } from "../useSlideshow";
import { ImageSlide } from "../views/ImageSlide";
import { TextSlide } from "../views/TextSlide";
import { TitleSlide } from "../views/TitleSlide";

export const UtviklervitserLuke = () => {
  return useSlideshow([
    <TitleSlide key={1}>Utviklervitser!</TitleSlide>,
    <TextSlide key={2}>
      <Text>"Why do frontend developers eat lunch alone?</Text>
      <Text>They don't know how to join tables."</Text>
    </TextSlide>,
    <TextSlide key={3}>
      <Text>"Sometimes I think the compiler ignores my comments."</Text>
    </TextSlide>,
    <TextSlide key={4}>
      <Text>
        "There are 10 types of people: Those who know binary, and those who
        don't."
      </Text>
    </TextSlide>,
    <TextSlide key={5}>
      <Text>
        "There are two hard problems in computer science:
        <br />- Cache invalidation,
        <br />- naming things
        <br />- and off-by-1 errors."
      </Text>
    </TextSlide>,
    <TextSlide key={6}>
      <Text>"Har du hørt om julenissen som sleit med pakketap?"</Text>
    </TextSlide>,
    <ImageSlide key={6.5} src="/images/utviklervitser/devjoke-1.jpg" />,
    <TextSlide key={7}>
      <Text>
        "Det er sortering for rest-avfall, men hvor kaster man soap-avfallet?"
      </Text>
    </TextSlide>,
    <TextSlide key={8}>
      <Text>"Hvorfor kan ikke jeg sluke, når Rich Harris' Svelte?"</Text>
    </TextSlide>,
    <ImageSlide key={6.5} src="/images/utviklervitser/devjoke-2.jpg" />,
    <TextSlide key={9}>
      <Text>(jada, vi har uhemmet stjålet disse fra nettet)</Text>
    </TextSlide>,
    <TextSlide key={10}>
      <Text>"How does fruit like to program? Pear programming."</Text>
    </TextSlide>,
    <TextSlide key={11}>
      <Text>"Knock knock... Race condition! Who's there?"</Text>
    </TextSlide>,
    <TextSlide key={12}>
      <Text>
        "Hva sier frontend-utvikleren på slutten av arbeidsdagen? Vi CSS i
        morgen!"
      </Text>
    </TextSlide>,
    <TextSlide key={13}>
      <Text>
        "A programmer was arrested for writing unreadable code He refused to
        comment"
      </Text>
    </TextSlide>,
    <TextSlide key={14}>
      <Text>"!false (it’s funny cause it’s true)"</Text>
    </TextSlide>,
    <TextSlide key={15}>
      <Text>
        "A programmer walks into a bar and orders 1.000000119 root beers. The
        bartender says, "I'm gonna have to charge you extra; that's a root beer
        float". And the programmer says, "Well in that case make it a double"."
      </Text>
    </TextSlide>,
    <TextSlide key={16}>
      <Text>
        "Why wasn't 'beef' accepted as a password? It wasn't stroganoff"
      </Text>
    </TextSlide>,
    <TextSlide key={17}>
      <Text>"Why are Assembly programmers always soaking wet?</Text>
      <Text>They work below C-level."</Text>
    </TextSlide>,
    <TextSlide key={18}>
      <Text>Why was it so hard to catch the hacker? He ransomware</Text>
    </TextSlide>,
  ]);
};
