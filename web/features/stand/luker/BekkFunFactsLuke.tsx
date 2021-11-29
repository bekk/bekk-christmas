import { Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useSlideshow } from "../useSlideshow";
import { TextSlide } from "../views/TextSlide";
import { TitleSlide } from "../views/TitleSlide";

export const BekkFunFactsLuke = () => {
  return useSlideshow([
    <TitleSlide key={1}>Fun facts om Bekk</TitleSlide>,
    <TextSlide key={2}>
      <Heading>#1: Hvorfor Bekk</Heading>
      <Text>
        En av grunnene til at Bekk heter Bekk er fordi det første kontoret vårt
        var ved Akerselvas utløp
      </Text>
    </TextSlide>,
    <TextSlide key={3}>
      <Heading>#2: Før Bekk var Bekk</Heading>
      <Text>
        Før Bekk het Bekk, het vi XO, Ice Econsulting og til og med avarten Bekk
        eBusiness Integrator 🕴
      </Text>
    </TextSlide>,
    <TextSlide key={3}>
      <Heading>#3: Logoer fra arkivet</Heading>
      <Image
        src="/images/bekk-logos.png"
        alt="Forskjellige versjoner av Bekk-logoen"
      />
      <Text>
        Vi har ikke skiftet logo før, men det var fordi vi itererte litt på den
        vi har
      </Text>
    </TextSlide>,
    <TextSlide key={4}>
      <Heading>#4: Mange Bekker små</Heading>
      <Text>
        I dag teller Bekk 522 ansatte, men det er over 1.000 som har kalt seg
        Bekkere på ett eller annet tidspunkt. Pluss over 500 sommerstudenter.
        Mange Bekkere små gjør en stor… vel forskjell.
      </Text>
    </TextSlide>,
    <TextSlide key={5}>
      <Heading>#5: Den spede begynnelse</Heading>
      <Text>
        Det første prosjektet Bekk leverte var en forretningsplan for
        Ingeniørforlaget!
      </Text>
    </TextSlide>,
    <TextSlide key={6}>
      <Heading>#6: Bootcamps</Heading>
      <Text>
        Når man starter i Bekk, drar man sammen med resten av "kullet" sitt til
        Lyngør. Men visste du at den aller første bootcampen ble avholdt "i en
        kjeller i Syden", ifølge CTOen vår.
      </Text>
    </TextSlide>,
    <TextSlide key={7}>
      <Heading>#7: Bekk Band!</Heading>
      <Text>
        Bekk Band er Bekk sitt eget husband, komplett med både salgssjef på
        trommer, administrerende direktør på gitar og mange andre flotte
        medlemmer. De har holdt på siden sin første konsert på julebordet på
        Stratos i 2004.
      </Text>
    </TextSlide>,
    <TextSlide key={8}>
      <Heading>#8: Celebert besøk</Heading>
      <Text>
        Bekk Band er ikke de eneste artistene som har hatt glede av å underholde
        Bekkere. Andre stjerner inkluderer
      </Text>
      <Text fontSize="2xl">
        Postgirobygget, Sunsanne Sundfør, Bare Egil Band, Tourettes, Datarock,
        Pony the Pirate, OnklP, Svømmebasseng, Paul Tonning, Klondike, Sondre
        Justad, Oslo Ess, Valentourettes, Dagny, Jonas Alaska, Lars Lillo
        Stenberg, Stein Torleif Bjella, Marion Ravn, Hank von Helvete (RIP),
        Tacobitch, Espen Beranek, Vidar Villa, Oral Bee, Pimp Lotion,
        Highasakite og Astrid S
      </Text>
    </TextSlide>,
  ]);
};
