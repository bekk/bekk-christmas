import React from "react";
import {
  ApningsLuke,
  BekkalikesLuke,
  BekkFunFactsLuke,
  BekkGjennomTideneLuke,
  BekkProsjekterLuke,
  BekkvortLuke,
  DagensArtiklerLuke,
  EtArMedHjemmekontorLuke,
  FagdagsminnerLuke,
  GenerativKunstLuke,
  GlitchOrDieLuke,
  HashtagEkteLuke,
  HobbyprosjekterLuke,
  RobinTalkLuke,
  SjokoladetidLuke,
  SluttenAvDagenLuke,
  TastekonkurranseLuke,
  UtviklervitserLuke,
  UuUtfordringenLuke,
} from "../../features/stand/luker";
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

  const Luke = luker[`Luke${currentLuke}`];

  return <Luke />;
}

const luker = {
  // Dag 1
  Luke1: ApningsLuke,
  Luke2: BekkGjennomTideneLuke,
  Luke3: FagdagsminnerLuke,
  Luke4: BekkProsjekterLuke,
  Luke5: EtArMedHjemmekontorLuke,
  Luke6: () => <DagensArtiklerLuke day={1} />,
  Luke7: TastekonkurranseLuke,
  Luke8: SluttenAvDagenLuke,

  // Dag 2
  Luke9: RobinTalkLuke,
  Luke10: BekkFunFactsLuke,
  Luke11: GenerativKunstLuke,
  Luke12: () => <DagensArtiklerLuke day={2} />,
  Luke13: SjokoladetidLuke,
  Luke14: HashtagEkteLuke,
  Luke15: () => {
    return useSlideshow([<TitleSlide key={1}>TBD</TitleSlide>]);
  },
  Luke16: GlitchOrDieLuke,

  // Dag 3
  Luke17: UtviklervitserLuke,
  Luke18: UuUtfordringenLuke,
  Luke19: HobbyprosjekterLuke,
  Luke20: BekkvortLuke,
  Luke21: BekkalikesLuke,
  Luke22: () => <DagensArtiklerLuke day={3} />,
  Luke23: () => {
    return useSlideshow([<TitleSlide key={1}>TBD</TitleSlide>]);
  },
  Luke24: SluttenAvDagenLuke,
};
