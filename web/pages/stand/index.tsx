import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useLuke } from "../../features/stand/useLuke";
import { useSecondsLeft } from "../../features/stand/useSecondsLeft";
import { useSlideshow } from "../../features/stand/useSlideshow";
import { CountdownSlide } from "../../features/stand/views/CountdownSlide";
import { GenerativeArtSlide } from "../../features/stand/views/GenerativeArtSlide";
import { TextSlide } from "../../features/stand/views/TextSlide";
import { TitleSlide } from "../../features/stand/views/TitleSlide";

export default function StandPage() {
  const { secondsLeft, reset } = useSecondsLeft();
  const { currentLuke, onNextLuke } = useLuke({ onLukeChange: reset });

  React.useEffect(() => {
    if (secondsLeft === 0) {
      onNextLuke();
    }
  }, [secondsLeft, onNextLuke]);

  if (secondsLeft < 60) {
    return <CountdownSlide secondsLeft={secondsLeft} />;
  }

  const Luke = luker[`Luke${currentLuke}`];

  return <Luke />;
}

const CONFERENCE_NAME = "NDC";

const luker = {
  Luke1: () => {
    return useSlideshow([
      <TitleSlide key={1}>Ha en flott dag på {CONFERENCE_NAME}</TitleSlide>,
      <TextSlide key={2}>
        Ta med deg bolle og kaffe til første foredrag! 👇
      </TextSlide>,
    ]);
  },
  Luke2: () => {
    return useSlideshow([
      <TitleSlide key={1}>Gløgg og pepper-kaker!</TitleSlide>,
    ]);
  },
  Luke3: () => {
    return useSlideshow([<TitleSlide key={1}>Fagdags&shy;minner</TitleSlide>]);
  },
  Luke4: () => {
    return useSlideshow([<TitleSlide key={1}>Bekk-prosjekter</TitleSlide>]);
  },
  Luke5: () => {
    return useSlideshow([
      <TitleSlide key={1}>Et år med hjemme-kontor</TitleSlide>,
    ]);
  },
  Luke6: () => {
    return useSlideshow([
      <TitleSlide key={1}>Dagens artikler</TitleSlide>,
      <TextSlide key={1}>
        <Text fontSize="5xl">Dagens artikler fra Bekk.christmas</Text>
        <Text fontSize="3xl">
          <strong>&quot;bla bla bla&quot;</strong> av Kristofer Giltvedt Selbekk
        </Text>
        <Text fontSize="3xl">
          <strong>&quot;todo: endre dette&quot;</strong> av Sara Waaler Eriksen
        </Text>
      </TextSlide>,
    ]);
  },
  Luke7: () => {
    return useSlideshow([<TitleSlide key={1}>Taste-konkurranse</TitleSlide>]);
  },
  Luke8: () => {
    return useSlideshow([<TitleSlide key={1}>Takk for i dag!</TitleSlide>]);
  },
  Luke9: () => {
    return useSlideshow([
      <TitleSlide key={1}>Få med deg Robin sin talk!</TitleSlide>,
      <TextSlide key={2}>
        <Text>Rom 7 @ 09.00</Text>
        <Text>
          <strong>Stabel: A concatenative programming language</strong>
        </Text>
      </TextSlide>,
    ]);
  },
  Luke10: () => {
    return useSlideshow([<TitleSlide key={1}>Fun facts om Bekk</TitleSlide>]);
  },
  Luke11: () => {
    return useSlideshow([
      <TitleSlide key={1}>Generativ kunst!</TitleSlide>,
      <TextSlide key={2}>
        <Stack>
          <Text>Lag dine egne generative kunstverk her</Text>
          <Text>Gå til laptopen ved skjermen for å teste det ut selv.</Text>
        </Stack>
      </TextSlide>,
      [<GenerativeArtSlide key={3} />, { duration: 60 * 1000 }],
    ]);
  },
  Luke12: () => {
    return useSlideshow([<TitleSlide key={1}>Dagens artikler</TitleSlide>]);
  },
  Luke13: () => {
    return useSlideshow([
      <TitleSlide key={0}>Sjokoladetid! 🍫</TitleSlide>,
      <TextSlide key="sjokkis">Kom og få deg litt sjokolade!</TextSlide>,
      <TitleSlide key={1}>Dagens artikler</TitleSlide>,
      <TextSlide key={2}>
        <Text fontSize="5xl">Dagens artikler fra Bekk.christmas</Text>
        <Text fontSize="3xl">
          <strong>&quot;bla bla bla&quot;</strong> av Kristofer Giltvedt Selbekk
        </Text>
        <Text fontSize="3xl">
          <strong>&quot;todo: endre dette&quot;</strong> av Sara Waaler Eriksen
        </Text>
      </TextSlide>,
    ]);
  },
  Luke14: () => {
    return useSlideshow([<TitleSlide key={1}>#ekte</TitleSlide>]);
  },
  Luke15: () => {
    return useSlideshow([
      <TitleSlide key={1}>Velkommen til Bekkvort!</TitleSlide>,
    ]);
  },
  Luke16: () => {
    // Glitch or die
    return useSlideshow([<TitleSlide key={1}>Game time!</TitleSlide>]);
  },
  Luke17: () => {
    return useSlideshow([<TitleSlide key={1}>Morgenlulz</TitleSlide>]);
  },
  Luke18: () => {
    return useSlideshow([<TitleSlide key={1}>UU-utfordringen!</TitleSlide>]);
  },
  Luke19: () => {
    return useSlideshow([
      <TitleSlide key={1}>Bekkere sine hobby-prosjekter</TitleSlide>,
    ]);
  },
  Luke20: () => {
    return useSlideshow([
      <TitleSlide key={1}>Velkommen til Bekkvort</TitleSlide>,
    ]);
  },
  Luke21: () => {
    return useSlideshow([<TitleSlide key={1}>Bekk-a-likes</TitleSlide>]);
  },
  Luke22: () => {
    return useSlideshow([<TitleSlide key={1}>Dagens artikler</TitleSlide>]);
  },
  Luke23: () => {
    return useSlideshow([<TitleSlide key={1}>TBD</TitleSlide>]);
  },
  Luke24: () => {
    return useSlideshow([<TitleSlide key={1}>Takk for nå!</TitleSlide>]);
  },
};
