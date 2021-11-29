import { Text } from "@chakra-ui/react";
import React from "react";
import { useSlideshow } from "../useSlideshow";
import { ImageSlide } from "../views/ImageSlide";
import { TextSlide } from "../views/TextSlide";
import { TitleSlide } from "../views/TitleSlide";

export const HashtagEkteLuke = () => {
  return useSlideshow([
    <TitleSlide key={1}>#ekte</TitleSlide>,
    <TextSlide key={2}>
      <Text>
        Det var mange følelser under Corona-året. Mange vonde, men også mange
        gode.
      </Text>
      <Text>
        Noen Bekkere startet #ekte - en anonym kanal der man kunne sende inn
        tanker, og få dem illustrert.
      </Text>
      <Text>Her er noen av disse tankene 🙏</Text>
    </TextSlide>,
    <ImageSlide key={3} src="/images/ekte/ekte-12-ar.png" />,
    <ImageSlide key={4} src="/images/ekte/ekte-dagene-er-like.png" />,
    <ImageSlide key={5} src="/images/ekte/ekte-fagdag-apent.png" />,
    <ImageSlide key={6} src="/images/ekte/ekte-fagdag-bla-bil.png" />,
    <ImageSlide key={7} src="/images/ekte/ekte-fagdag-koronaklode.png">
      Jeg har angst for å ubevisst kunne smitte folk rundt meg! Hva om jeg
      smitter noen som dør ? 😳
    </ImageSlide>,
    <ImageSlide key={8} src="/images/ekte/ekte-fagdag-trangt.png" />,
    <ImageSlide key={9} src="/images/ekte/ekte-fette-lei-korona.png">
      æ e så fette lei korona
    </ImageSlide>,
    <ImageSlide key={10} src="/images/ekte/ekte-forlatt-igjen.png" />,
    <ImageSlide key={11} src="/images/ekte/ekte-fredagsshow.png" />,
    <ImageSlide key={12} src="/images/ekte/ekte-gaming.png">
      Spill og gaming har hjulpet meg å sosialisere mye via nett i korona! Det
      er jeg takknemmelig for
    </ImageSlide>,
    <ImageSlide key={13} src="/images/ekte/ekte-hagearbeid.png">
      Elsker at man kan gjøre litt hus og hagearbeid i lunsjen når man har
      hjemmekontor
    </ImageSlide>,
    <ImageSlide key={14} src="/images/ekte/ekte-helen-1.png">
      Jeg elsker høsten
    </ImageSlide>,
    <ImageSlide key={15} src="/images/ekte/ekte-helen-2.png" />,
    <ImageSlide key={16} src="/images/ekte/ekte-helen-3.png" />,
    <ImageSlide key={17} src="/images/ekte/ekte-hurra-vaksinedose.png" />,
    <ImageSlide key={18} src="/images/ekte/ekte-indre-ro.png" />,
    <ImageSlide key={19} src="/images/ekte/ekte-jeg-tror-jeg-er-forelsket.png">
      Jeg har truffet en jente, nå kan våren komme. Jeg tror jeg er forelsket.
    </ImageSlide>,
    <ImageSlide key={20} src="/images/ekte/ekte-kaffe.png" />,
    <ImageSlide key={21} src="/images/ekte/ekte-katt.png">
      Den nye lockdownen kunne ikke kommet på et verre tidspunkt. Nå er jeg helt
      på bristepunktet :(
    </ImageSlide>,
    <ImageSlide key={21} src="/images/ekte/ekte-lost.png">
      Jeg er helt lost i livet
    </ImageSlide>,
    <ImageSlide
      key={21}
      src="/images/ekte/ekte-nyvinning-og-kreativitet.png"
    />,
    <ImageSlide key={21} src="/images/ekte/ekte-pacemaker-leve-evig.png" />,
    <ImageSlide key={21} src="/images/ekte/ekte-pappa.png" />,
    <ImageSlide key={21} src="/images/ekte/ekte-skriket-pa-brygga.png" />,
    <ImageSlide key={21} src="/images/ekte/ekte-slange.png" />,
  ]);
};
