import React from "react";
import * as Luker from "../../features/stand/luker";
import { useLuke } from "../../features/stand/useLuke";
import { useSecondsLeft } from "../../features/stand/useSecondsLeft";
import { useSlideshow } from "../../features/stand/useSlideshow";
import { CountdownSlide } from "../../features/stand/views/CountdownSlide";
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

  const Luke = lukeMapping[`Luke${currentLuke}`];

  return <Luke />;
}

const lukeMapping = {
  // Dag 1
  Luke1: Luker.ApningsLuke,
  Luke2: Luker.BekkGjennomTideneLuke,
  Luke3: Luker.FagdagsminnerLuke,
  Luke4: Luker.BekkProsjekterLuke,
  Luke5: Luker.PelsedirektoratetLuke,
  Luke6: () => <Luker.DagensArtiklerLuke day={1} />,
  Luke7: Luker.TastekonkurranseLuke,
  Luke8: Luker.SluttenAvDagenLuke,

  // Dag 2
  Luke9: Luker.RobinTalkLuke,
  Luke10: Luker.BekkFunFactsLuke,
  Luke11: Luker.GenerativKunstLuke,
  Luke12: () => <Luker.DagensArtiklerLuke day={2} />,
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
  Luke23: () => {
    return useSlideshow([<TitleSlide key={1}>TBD</TitleSlide>]);
  },
  Luke24: Luker.SluttenAvDagenLuke,
};
