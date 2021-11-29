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

  const Luke = lukeMapping[`Luke${currentLuke}`];

  return <Luke />;
}

const lukeMapping = {
  // Dag 1
  Luke1: Luker.ApningsLuke,
  Luke2: () => <Luker.DagensArtiklerLuke day={1} />,
  Luke3: Luker.FagdagsminnerLuke,
  Luke4: Luker.BekkProsjekterLuke,
  Luke5: Luker.PelsedirektoratetLuke,
  Luke6: Luker.BekkGjennomTideneLuke,
  Luke7: Luker.TastekonkurranseLuke,
  Luke8: Luker.SluttenAvDagenLuke,

  // Dag 2
  Luke9: Luker.RobinTalkLuke,
  Luke10: () => <Luker.DagensArtiklerLuke day={2} />,
  Luke11: Luker.GenerativKunstLuke,
  Luke12: Luker.BekkFunFactsLuke,
  Luke13: Luker.SjokoladetidLuke,
  Luke14: Luker.HashtagEkteLuke,
  Luke15: Luker.AtlasLuke,
  Luke16: Luker.GlitchOrDieLuke,

  // Dag 3
  Luke17: Luker.UtviklervitserLuke,
  Luke18: () => <Luker.DagensArtiklerLuke day={3} />,
  Luke19: Luker.HobbyprosjekterLuke,
  Luke20: Luker.BekkvortLuke,
  Luke21: Luker.BekkalikesLuke,
  Luke22: Luker.UuUtfordringenLuke,
  Luke23: Luker.LivetIBekkLuke,
  Luke24: Luker.SluttenAvDagenLuke,
};
