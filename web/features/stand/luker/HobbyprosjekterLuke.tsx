import {
  Heading,
  Image as ChakraImage,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { useSlideshow } from "../useSlideshow";
import { TextSlide } from "../views/TextSlide";
import { TitleSlide } from "../views/TitleSlide";

export const HobbyprosjekterLuke = () => {
  return useSlideshow([
    <TitleSlide key={1}>Bekkere sine hobby-prosjekter</TitleSlide>,
    <TextSlide key={2}>
      <ChakraImage
        src="/images/hobbyprosjekter/plumpy-1.png"
        alt="Plumpy logo"
      />
      <Heading fontSize="6xl">Plumpy</Heading>
      <Text>
        Fredrik Lillejordet ble småbarnspappa og app-maker i ett med denne
        praktiske amme-appen til iOS og Android.
      </Text>
    </TextSlide>,
    <TextSlide key={3}>
      <MotionImage
        src="/images/hobbyprosjekter/plumpy-2.png"
        alt="Plumpy screenshot"
        width="100%"
        height="100%"
        objectFit="contain"
        animate={{ scale: 1.2 }}
        transition={{ duration: 10 }}
      />
    </TextSlide>,
    <TextSlide key={4}>
      <MotionImage
        src="/images/hobbyprosjekter/laser-pong-1.png"
        alt="Laser PONG"
        animate={{ x: 100 }}
        transition={{ duration: 10 }}
      />
      <MotionImage
        src="/images/hobbyprosjekter/laser-pong-2.png"
        alt="Laser PONG"
        animate={{ x: -100, y: -10 }}
        initial={{ y: -10 }}
        transition={{ duration: 10 }}
      />
      <Heading fontSize="6xl" textAlign="center" mt={6}>
        Laser Pong 💥
      </Heading>
    </TextSlide>,
    <TextSlide key={5}>
      <Heading fontSize="6xl" textAlign="center" mt={6}>
        Laser Pong 💥
      </Heading>
      <Text>
        Pong var et av de første videospillene i hele verden, og det første som
        oppnådde stor popularitet på både spilleautomater og hjemmekonsoller.
        Hvordan kan man egentlig gjøre PONG enda bedre? Jo med LASER såklart!
      </Text>
    </TextSlide>,
    <TextSlide key={6}>
      <Heading fontSize="6xl" textAlign="center" mt={6}>
        Laser Pong 💥
      </Heading>
      <Text>
        Simon Nistad laget like godt sin egen laserfremviser og spillkonsoll fra
        scratch på et år!
      </Text>
      <SimpleGrid columns={2}>
        <MotionImage
          src="/images/hobbyprosjekter/laser-pong-3.png"
          alt="laser pong"
          animate={{ y: 60 }}
          transition={{ duration: 10 }}
        />
        <MotionImage
          src="/images/hobbyprosjekter/laser-pong-4.png"
          alt="laser pong"
          animate={{ y: 100, x: -10 }}
          initial={{ x: -10 }}
          transition={{ duration: 10 }}
        />
      </SimpleGrid>
    </TextSlide>,
    <TextSlide key={7}>
      <Heading fontSize="6xl" textAlign="center" mt={6}>
        Laser Pong 💥
      </Heading>
      <Text>
        Simon Nistad laget like godt sin egen laserfremviser og spillkonsoll fra
        scratch på et år!
      </Text>
      <SimpleGrid columns={2}>
        <MotionImage
          src="/images/hobbyprosjekter/laser-pong-3.png"
          alt="laser pong"
          animate={{ y: 60 }}
          transition={{ duration: 10 }}
        />
        <MotionImage
          src="/images/hobbyprosjekter/laser-pong-4.png"
          alt="laser pong"
          animate={{ y: 100, x: -10 }}
          initial={{ x: -10 }}
          transition={{ duration: 10 }}
        />
      </SimpleGrid>
    </TextSlide>,
    <TextSlide key={8} background="#fef9ea">
      <Heading fontSize="6xl">Garasjeplasser</Heading>
      <Text>
        Lei av naboer som maser om lån av garasjeplasser på Facebook? Anders Bøe
        har laget en måte du enkelt kan leie ut din egen, eller låne en annens
        garasjeplass etter eget behov!
      </Text>
    </TextSlide>,
    <TextSlide key={9} background="#fef9ea">
      <Heading fontSize="6xl">Garasjeplasser</Heading>
      <MotionImage
        src="/images/hobbyprosjekter/garasjeplasser-1.png"
        alt="Garasjeplasser screenshot"
        animate={{ x: 200 }}
        initial={{ x: -100 }}
        transition={{ duration: 10 }}
      />
    </TextSlide>,
    <TextSlide key={10}>
      <Heading fontSize="6xl">Spillmotor i Kotlin</Heading>
      <ChakraImage
        src="/images/hobbyprosjekter/spillmotor-1.gif"
        alt="Screenplay fra spillet"
        width="100%"
      />
    </TextSlide>,
    <TextSlide key={11}>
      <Heading fontSize="6xl">Spillmotor i Kotlin</Heading>
      <Text>
        Har du noen gang lurt på hvordan en spillmotor fungerer? Hva er en
        spillmotor og hvordan fungerer det egentlig? Vegard Veiset har over de
        siste tre årene laget sin egen spillmotor i Kotlin fra bunnen av.
      </Text>
    </TextSlide>,
    <TextSlide key={12}>
      <Heading fontSize="6xl">Spillmotor i Kotlin</Heading>
      <MotionImage
        src="/images/hobbyprosjekter/spillmotor-2.png"
        alt="spillmotor demo"
        animate={{ x: 60 }}
        transition={{ duration: 10 }}
      />
      <MotionImage
        src="/images/hobbyprosjekter/spillmotor-3.png"
        alt="spillmotor demo"
        animate={{ x: -60, y: -10 }}
        initial={{ y: -10 }}
        transition={{ duration: 10 }}
      />
    </TextSlide>,
  ]);
};

const MotionImage = motion(ChakraImage);
