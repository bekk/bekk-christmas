import { Text } from "@chakra-ui/react";
import React from "react";
import { useLuke } from "../../features/stand/useLuke";
import { useSecondsLeft } from "../../features/stand/useSecondsLeft";
import { useSlideshow } from "../../features/stand/useSlideshow";
import { CountdownSlide } from "../../features/stand/views/CountdownSlide";
import { TextSlide } from "../../features/stand/views/TextSlide";
import { TitleSlide } from "../../features/stand/views/TitleSlide";

export default function StandPage() {
  const secondsLeft = useSecondsLeft();
  const { currentLuke, onNextLuke } = useLuke();

  React.useEffect(() => {
    if (secondsLeft === 0) {
      onNextLuke();
    }
  }, [secondsLeft, onNextLuke]);

  if (secondsLeft < 60) {
    return <CountdownSlide secondsLeft={secondsLeft} />;
  }
  return <LukeSelector secondsLeft={secondsLeft} currentLuke={currentLuke} />;
}

type LukeSelectorProps = { currentLuke: number; secondsLeft: number };
const LukeSelector = ({ currentLuke, secondsLeft }: LukeSelectorProps) => {
  switch (currentLuke) {
    case 1:
      return <Luke1 />;
    case 2:
      return <Luke2 />;
    case 3:
      return <Luke3 />;
    case 4:
      return <Luke4 />;
    case 5:
      return <Luke5 />;
    case 6:
      return <Luke6 />;
    case 7:
      return <Luke7 />;
    case 8:
      return <Luke8 />;
    case 9:
      return <Luke9 />;
    case 10:
      return <Luke10 />;
    case 11:
      return <Luke11 />;
    case 12:
      return <Luke12 />;
    case 13:
      return <Luke13 />;
    case 14:
      return <Luke14 />;
    case 15:
      return <Luke15 />;
    case 16:
      return <Luke16 />;
    case 17:
      return <Luke17 />;
    case 18:
      return <Luke18 />;
    case 19:
      return <Luke19 />;
    case 20:
      return <Luke20 />;
    case 21:
      return <Luke21 />;
    case 22:
      return <Luke22 />;
    case 23:
      return <Luke23 />;
    case 24:
      return <Luke24 />;
    default:
      return null;
  }
};

const CONFERENCE_NAME = "NDC";

const Luke1 = () => {
  return useSlideshow([
    <TitleSlide key={1}>Ha en flott dag på {CONFERENCE_NAME}</TitleSlide>,
    <TextSlide key={2}>
      Ta med deg bolle og kaffe til første foredrag! 👇
    </TextSlide>,
  ]);
};
const Luke2 = () => {
  return useSlideshow([
    <TitleSlide key={1}>Gløgg og pepper-kaker!</TitleSlide>,
  ]);
};
const Luke3 = () => {
  return useSlideshow([<TitleSlide key={1}>Fagdags&shy;minner</TitleSlide>]);
};
const Luke4 = () => {
  return useSlideshow([<TitleSlide key={1}>Bekk-prosjekter</TitleSlide>]);
};
const Luke5 = () => {
  return useSlideshow([
    <TitleSlide key={1}>Et år med hjemme-kontor</TitleSlide>,
  ]);
};
const Luke6 = () => {
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
};
const Luke7 = () => {
  return useSlideshow([<TitleSlide key={1}>Taste-konkurranse</TitleSlide>]);
};
const Luke8 = () => {
  return useSlideshow([<TitleSlide key={1}>Takk for i dag!</TitleSlide>]);
};
const Luke9 = () => {
  return useSlideshow([
    <TitleSlide key={1}>Få med deg Robin sin talk!</TitleSlide>,
    <TextSlide key={2}>
      <Text>Rom 7 @ 09.00</Text>
      <Text>
        <strong>Stabel: A concatenative programming language</strong>
      </Text>
    </TextSlide>,
  ]);
};
const Luke10 = () => {
  return useSlideshow([<TitleSlide key={1}>Fun facts om Bekk</TitleSlide>]);
};
const Luke11 = () => {
  return useSlideshow([<TitleSlide key={1}>Generativ kunst!</TitleSlide>]);
};
const Luke12 = () => {
  return useSlideshow([<TitleSlide key={1}>Dagens artikler</TitleSlide>]);
};
const Luke13 = () => {
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
};
const Luke14 = () => {
  return useSlideshow([<TitleSlide key={1}>#ekte</TitleSlide>]);
};
const Luke15 = () => {
  return useSlideshow([
    <TitleSlide key={1}>Velkommen til Bekkvort!</TitleSlide>,
  ]);
};
const Luke16 = () => {
  // Glitch or die
  return useSlideshow([<TitleSlide key={1}>Game time!</TitleSlide>]);
};
const Luke17 = () => {
  return useSlideshow([<TitleSlide key={1}>Morgenlulz</TitleSlide>]);
};
const Luke18 = () => {
  return useSlideshow([<TitleSlide key={1}>UU-utfordringen!</TitleSlide>]);
};
const Luke19 = () => {
  return useSlideshow([
    <TitleSlide key={1}>Bekkere sine hobby-prosjekter</TitleSlide>,
  ]);
};
const Luke20 = () => {
  return useSlideshow([
    <TitleSlide key={1}>Velkommen til Bekkvort</TitleSlide>,
  ]);
};
const Luke21 = () => {
  return useSlideshow([<TitleSlide key={1}>Bekk-a-likes</TitleSlide>]);
};
const Luke22 = () => {
  return useSlideshow([<TitleSlide key={1}>Dagens artikler</TitleSlide>]);
};
const Luke23 = () => {
  return useSlideshow([<TitleSlide key={1}>TBD</TitleSlide>]);
};
const Luke24 = () => {
  return useSlideshow([<TitleSlide key={1}>Takk for nå!</TitleSlide>]);
};
