import { Box, Center } from "@chakra-ui/react";
import React from "react";
import { GreenBranch } from "../christmas-decoration/GreenBranch";
import { Holly } from "../christmas-decoration/Holly";
import { HollyWithNuts } from "../christmas-decoration/HollyWithNuts";
import { LargePinecone } from "../christmas-decoration/LargePinecone";
import { Mistletoe } from "../christmas-decoration/Mistletoe";
import { MistletoeUpsideDown } from "../christmas-decoration/MistletoeUpsideDown";
import { PineAcrossRtl } from "../christmas-decoration/PineAcross";
import { PineAcrossLtr } from "../christmas-decoration/PineAcrossLtr";
import { PineBunch } from "../christmas-decoration/PineBunch";
import { Snowflakes } from "../christmas-decoration/Snowflakes";
import { BekkChristmasLogo } from "../design-system/BekkChristmasLogo";
import { MotionBox } from "../MotionBox";
import { Snowfall } from "../snowfall/Snowfall";

export const TeaserLandingPage = () => {
  return (
    <Center
      height="100vh"
      background="brand.darkGreen"
      overflow="hidden"
      position="relative"
    >
      <MotionBox
        position="absolute"
        bottom="0"
        right="-30"
        transformOrigin="bottom right"
        width={["40vw", "20vw"]}
        animate={{ x: [0, -10, 3, 0], skew: [0, 2, -1, 0] }}
        transition={{ duration: 5, repeat: Infinity } as any}
      >
        <PineBunch />
      </MotionBox>
      <MotionBox
        whileHover={{ scale: 0.95, y: 20 }}
        position="absolute"
        bottom={["-10", "-20"]}
        left="50"
        transformOrigin="bottom left"
        width={["100vw", "30vw"]}
        animate={{ x: [0, -20, 10, 0], rotate: [0, -5, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity } as any}
      >
        <PineAcrossLtr />
      </MotionBox>
      <MotionBox
        whileHover={{ scale: 0.95, x: -20 }}
        position="absolute"
        top={["-50", "-200"]}
        right="20%"
        width={["80vw", "40vw"]}
        animate={{ x: [0, -20, 10, 0], rotate: [0, 2, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity } as any}
      >
        <PineAcrossRtl />
      </MotionBox>
      <MotionBox
        whileHover={{ scale: 0.9, rotate: 10 }}
        position="absolute"
        top="0"
        right={["-30", "-100"]}
        transformOrigin="top right"
        width={["70vw", "30vw"]}
      >
        <Holly />
      </MotionBox>
      <MotionBox
        whileHover={{ scale: 0.9, rotate: -10 }}
        position="absolute"
        top="0"
        left={["-30", "-100"]}
        transformOrigin="bottom left"
        width={["70vw", "30vw"]}
      >
        <HollyWithNuts />
      </MotionBox>
      <MotionBox
        whileHover={{ y: 20 }}
        position="absolute"
        bottom={["-10", "-20"]}
        left="50"
        transformOrigin="bottom center"
        width={["10vw", "20vw"]}
      >
        <GreenBranch />
      </MotionBox>
      <MotionBox
        whileHover={{ scale: 0.99 }}
        position="absolute"
        top={["20", "50"]}
        left="50"
        transformOrigin="bottom center"
        width={["40vw", "20vw"]}
      >
        <Snowflakes />
      </MotionBox>
      <MotionBox
        whileHover={{ scale: 0.95, x: 20 }}
        position="absolute"
        bottom="-10"
        right="-10"
        transformOrigin="bottom center"
        width={["30vw", "10vw"]}
      >
        <LargePinecone />
      </MotionBox>
      <Box
        position="absolute"
        bottom={["-5", "-20"]}
        left="-5"
        transformOrigin="center center"
        width={["60vw", "20vw"]}
        transform="rotate(125deg)"
      >
        <Holly />
      </Box>
      <MotionBox
        whileHover={{ scale: 0.95, x: 20 }}
        position="absolute"
        bottom={["-5", "-200"]}
        right="20%"
        width={["40vw", "15vw"]}
      >
        <Mistletoe />
      </MotionBox>
      <MotionBox
        whileHover={{ scale: 0.95, x: -20 }}
        position="absolute"
        top={["-5", "-200"]}
        left={["50%", "20%"]}
        width={["40vw", "15vw"]}
      >
        <MistletoeUpsideDown />
      </MotionBox>
      <Snowfall />
      <BekkChristmasLogo width="80vw" maxWidth="30rem" zIndex="10" />
    </Center>
  );
};
