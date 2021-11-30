import React from "react";
import * as Luker from "../../features/stand/luker";
import { useLuke } from "../../features/stand/useLuke";
import { useSecondsLeft } from "../../features/stand/useSecondsLeft";
import { CountdownSlide } from "../../features/stand/views/CountdownSlide";

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

  const Luke = lukeMapping[currentLuke - 1];

  return <Luke />;
}

const lukeMapping = [
  // Dag 1
  Luker.ApningsLuke,
  () => <Luker.DagensArtiklerLuke day={1} />,
  Luker.FagdagsminnerLuke,
  Luker.BekkProsjekterLuke,
  Luker.PelsedirektoratetLuke,
  Luker.BekkGjennomTideneLuke,
  Luker.TastekonkurranseLuke,
  Luker.LivetIBekkLuke,
  Luker.SluttenAvDagenLuke,

  // Dag 2
  Luker.RobinTalkLuke,
  () => <Luker.DagensArtiklerLuke day={2} />,
  Luker.GlitchOrDieLuke,
  Luker.SjokoladetidLuke,
  Luker.GenerativKunstLuke, // TODO: Denne må vi fikse på et vis
  Luker.HashtagEkteLuke,
  Luker.BekkFunFactsLuke,
  Luker.AtlasLuke,
  // TODO: En til her kanskje?
  Luker.SluttenAvDagenLuke,

  // Dag 3
  Luker.StartPaSisteDagLuke,
  () => <Luker.DagensArtiklerLuke day={3} />,
  Luker.UtviklervitserLuke,
  Luker.UuUtfordringenLuke,
  Luker.KlistremerkerLuke,
  Luker.BekkvortLuke,
  Luker.BekkalikesLuke,
  Luker.HobbyprosjekterLuke,
  Luker.LivetIBekkLuke,
  Luker.SluttenPaKonferansenLuke,
];
