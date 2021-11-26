import { Heading, Stack, Text } from "@chakra-ui/layout";
import React from "react";
import { useSlideshow } from "../useSlideshow";
import { TextSlide } from "../views/TextSlide";
import { TitleSlide } from "../views/TitleSlide";

export const BekkProsjekterLuke = () => {
  return useSlideshow([
    <TitleSlide key={1}>Bekk-prosjekter</TitleSlide>,
    <TextSlide key={2}>
      <Stack>
        <Heading>{"<ForrigeUke />"}</Heading>
        <Text>
          {"<ForrigeUke />"} er en artikkelserie på blogg.bekk.no, som
          oppsummerer hva som skjedde i frontend-verden i uken som var
        </Text>
      </Stack>
    </TextSlide>,
    <TextSlide key={3}>
      <Stack>
        <Heading>Drypp</Heading>
        <Text>
          Drypp er en lavterskel podcast der vi snakker om innovasjon,
          produktutvikling, forretningsutvikling og ledelse.
        </Text>
      </Stack>
    </TextSlide>,
    <TextSlide key={4}>
      <Stack>
        <Heading>Den Norske Opera og Ballett</Heading>
        <Text>Vi fikk mulighet til å revitalisere Operaen.no</Text>
        <Text>
          For å bedre gjenspeile det moderne uttrykket til bygget og den åpne
          atmosfæren, har nettsidene gått fra å være tett innrammet med en
          massiv meny til å ha mer luft mellom både bilder og tekst. I tillegg
          har fargepaletten blitt lysere og lettere, med inspirasjon fra bygget
          og materialene der.
        </Text>
      </Stack>
    </TextSlide>,
    <TextSlide key={5}>
      <Stack>
        <Heading>Pils og Programmering</Heading>
        <Text>
          «Pils og programmering» er et enkelt konsept: en samling for folk som
          liker å ta et par pils mens de progger i godt lag. Ta med deg maskinen
          og en idé du bryr deg om, og slipp skaperevnen løs blant likesinnede.
          Bli inspirert av hva andre jobber på, få feedback på dine egne
          prosjekter og ha en hyggelig kveld med andre flinke fagfolk.
        </Text>
        <Text>
          Og selvfølgelig, du trenger ikke drikke pils. Du får også alkoholfritt
          og brus. Og mat.
        </Text>
      </Stack>
    </TextSlide>,
    <TextSlide key={6}>
      <Stack>
        <Heading>Klimabrølet</Heading>
        <Text>
          Klimabrølet er en uavhengig forening som har som mål å iverksette
          tiltak slik av vi kan begrense global oppvarming. Klimabrølet jobber
          for å bygge en folkelig oppslutning for å påvirke politikere til å ta
          klimaet på alvor. Teamet har jobbet med løsningen for de digitale
          brølene, og med årets Klimabrøl-markering som var i slutten av august.
        </Text>
      </Stack>
    </TextSlide>,
    <TextSlide key={7}>
      <Stack>
        <Heading>Entur Tavla</Heading>
        <Text>
          Entur Tavla lar deg enkelt lage din egen avgangstavle for den adressen
          du ønsker i hele Norge, med tilpasset visningsformat, antall
          stoppesteder og hvilke reisemodaliteter du ønsker
        </Text>
        <Text>
          Tavla har et stort potensiale til å ta over som ruteinformasjonssystem
          på hoteller, kjøpesentre, flyplasser, kontorer og lignende
        </Text>
        <Text>
          Er du interessert i en sniktitt, ta en tur på tavla.entur.no!
        </Text>
      </Stack>
    </TextSlide>,
    <TextSlide key={8}>
      <Stack>
        <Heading>Pushwagnesizer</Heading>
        <Text>
          I samarbeid med Grafill, fikk Bekk være med å konseptualisere temaet
          for ED Awards, «Making new connections». Målet var å skape en unik
          opplevelse for de besøkende ved å forene design og teknologi.
        </Text>
      </Stack>
    </TextSlide>,
  ]);
};
