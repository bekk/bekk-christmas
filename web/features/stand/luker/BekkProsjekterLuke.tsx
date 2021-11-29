import { Heading, Text } from "@chakra-ui/layout";
import React from "react";
import { useSlideshow } from "../useSlideshow";
import { TextSlide } from "../views/TextSlide";
import { TitleSlide } from "../views/TitleSlide";

export const BekkProsjekterLuke = () => {
  return useSlideshow([
    <TitleSlide key={1}>Bekk-prosjekter</TitleSlide>,
    <TextSlide key={2}>
      <Heading>{"<ForrigeUke />"}</Heading>
      <Text>
        {"<ForrigeUke />"} er en artikkelserie på blogg.bekk.no, som oppsummerer
        hva som skjedde i frontend-verden i uken som var
      </Text>
    </TextSlide>,
    <TextSlide key={3}>
      <Heading>Drypp</Heading>
      <Text>
        Drypp er en lavterskel podcast der vi snakker om innovasjon,
        produktutvikling, forretningsutvikling og ledelse.
      </Text>
    </TextSlide>,
    <TextSlide key={4}>
      <Heading>Den Norske Opera og Ballett</Heading>
      <Text>Vi fikk mulighet til å revitalisere Operaen.no</Text>
      <Text>
        For å bedre gjenspeile det moderne uttrykket til bygget og den åpne
        atmosfæren, har nettsidene gått fra å være tett innrammet med en massiv
        meny til å ha mer luft mellom både bilder og tekst.
      </Text>
    </TextSlide>,
    <TextSlide key={5}>
      <Heading>Pils og Programmering</Heading>
      <Text>
        «Pils og programmering» er et enkelt konsept: en samling for folk som
        liker å ta et par pils mens de progger i godt lag. Ta med deg maskinen
        og en idé du bryr deg om, og slipp skaperevnen løs blant likesinnede.
      </Text>
      <Text>
        Og selvfølgelig, du trenger ikke drikke pils. Du får også alkoholfritt
        og brus. Og mat. 🍕
      </Text>
    </TextSlide>,
    <TextSlide key={6}>
      <Heading>Klimabrølet</Heading>
      <Text>
        Klimabrølet jobber for å bygge en folkelig oppslutning for å påvirke
        politikere til å ta klimaet på alvor. Teamet har jobbet med løsningen
        for de digitale brølene, og med årets Klimabrøl-markering som var i
        slutten av august.
      </Text>
    </TextSlide>,
    <TextSlide key={7}>
      <Heading>Entur Tavla</Heading>
      <Text>
        Entur Tavla lar deg enkelt lage din egen avgangstavle for den adressen
        du ønsker i hele Norge, med tilpasset visningsformat, antall
        stoppesteder og hvilke typer reiser du ønsker.
      </Text>
    </TextSlide>,
    <TextSlide key={8}>
      <Heading>Pushwagnesizer</Heading>
      <Text>
        I samarbeid med Grafill, fikk Bekk være med å konseptualisere temaet for
        ED Awards, «Making new connections». Målet var å skape en unik
        opplevelse for de besøkende ved å forene design og teknologi.
      </Text>
    </TextSlide>,
  ]);
};
