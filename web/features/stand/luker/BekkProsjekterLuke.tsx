import { Box, Heading, Text } from "@chakra-ui/layout";
import React from "react";
import tp from "timeproxy";
import { useSlideshow } from "../useSlideshow";
import { FullScreenImageSlide } from "../views/FullScreenImageSlide";
import { ImageSlide } from "../views/ImageSlide";
import { TextSlide } from "../views/TextSlide";
import { TitleSlide } from "../views/TitleSlide";

export const BekkProsjekterLuke = () => {
  return useSlideshow([
    <TitleSlide key={0}>Bekk-prosjekter</TitleSlide>,
    <TextSlide key={1}>
      <Text>
        Bekk driver med mye rart. Her er et par prosjekter – både interne og
        eksterne – vi er ekstra stolte av 🤩
      </Text>
    </TextSlide>,
    <TextSlide key={2}>
      <Heading fontSize="7xl" fontWeight="normal">
        {"<ForrigeUke />"}
      </Heading>
      <Text>
        {"<ForrigeUke />"} er en artikkelserie på blogg.bekk.no, som oppsummerer
        hva som skjedde i frontend-verden i uken som var
      </Text>
    </TextSlide>,
    <FullScreenImageSlide
      key={2.5}
      src="/images/bekk-prosjekter/forrigeuke.gif"
      alt="Scrolling av ForrigeUke-artikler. Det er veldig mange av dem. Du blir imponert."
    />,
    <TextSlide key={3}>
      <Heading fontSize="7xl" fontWeight="normal">
        Drypp
      </Heading>
      <Text>
        Drypp er en lavterskel podcast der vi snakker om innovasjon,
        produktutvikling, forretningsutvikling og ledelse.
      </Text>
    </TextSlide>,
    <FullScreenImageSlide
      key={3.5}
      src="/images/bekk-prosjekter/drypp.jpg"
      animationIndex={1}
      alt="Drypp logo"
    />,
    <TextSlide key={4}>
      <Heading fontSize="7xl" fontWeight="normal">
        Den Norske Opera og Ballett
      </Heading>
      <Text>Vi fikk mulighet til å revitalisere Operaen.no</Text>
      <Text>
        For å bedre gjenspeile det moderne uttrykket til bygget og den åpne
        atmosfæren, har nettsidene gått fra å være tett innrammet med en massiv
        meny til å ha mer luft mellom både bilder og tekst.
      </Text>
    </TextSlide>,
    <FullScreenImageSlide
      key={4.5}
      src="/images/bekk-prosjekter/operaen.gif"
      alt="En scroll nedover operaen.no"
    />,
    <TextSlide key={5}>
      <Heading fontSize="7xl" fontWeight="normal">
        Pils og Programmering
      </Heading>
      <Text>
        «Pils og programmering» er et enkelt konsept: en samling for folk som
        liker å ta et par pils mens de progger i godt lag. Ta med deg maskinen
        og en idé du bryr deg om, og slipp skaperevnen løs blant likesinnede.
      </Text>
    </TextSlide>,
    <FullScreenImageSlide
      key={5.5}
      src="/images/bekk-prosjekter/pils-og-programmering.jpg"
      alt="En gjeng med folk på Pils og Programmering"
      animationIndex={2}
    />,
    <TextSlide key={6}>
      <Heading fontSize="7xl" fontWeight="normal">
        Klimabrølet
      </Heading>
      <Text>
        Klimabrølet jobber for å bygge en folkelig oppslutning for å påvirke
        politikere til å ta klimaet på alvor. Teamet har jobbet med løsningen
        for de digitale brølene, og med årets Klimabrøl-markering som var i
        slutten av august.
      </Text>
    </TextSlide>,
    <TextSlide key={7}>
      <Heading fontSize="7xl" fontWeight="normal">
        Entur Tavla
      </Heading>
      <Text>
        Entur Tavla lar deg enkelt lage din egen avgangstavle for den adressen
        du ønsker i hele Norge, med tilpasset visningsformat, antall
        stoppesteder og hvilke typer reiser du ønsker.
      </Text>
    </TextSlide>,
    <ImageSlide key={7.5} src="/images/bekk-prosjekter/tavla.gif">
      Entur-tavla i forskjellige farger
    </ImageSlide>,
    <TextSlide key={8}>
      <Heading fontSize="7xl" fontWeight="normal">
        Pushwagnesizer
      </Heading>
      <Text>
        I samarbeid med Grafill, fikk Bekk være med å konseptualisere temaet for
        ED Awards, «Making new connections». Målet var å skape en unik
        opplevelse for de besøkende ved å forene design og teknologi.
      </Text>
    </TextSlide>,
    [
      <Box
        key={8.5}
        as="iframe"
        src="https://player.vimeo.com/video/277950196?h=dafe427d52&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1&amp;loop=1"
        width="100vw"
        height="100vh"
        background="black"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="Stand-video 2021"
        pointerEvents="none"
      />,
      { duration: tp`1 minute 59 seconds` },
    ],
  ]);
};
