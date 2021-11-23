import React from "react";
import { Container, Box, Flex } from "@chakra-ui/react";
import { BekkChristmasLogo } from "../design-system/BekkChristmasLogo";
import { BackButton } from "../post-list/BackButton";

export const ArticleHeader = () => {
  return (
    <Flex as="header" minHeight="15vh" alignItems="center">
      <Container maxWidth="container.lg">
        <BackButton color="brand.darkGreen" />
        <Box
          position={["absolute"]}
          alignSelf="flex-end"
          top={["40px", "60px"]}
          right={["5vw", "10vw"]}
          pointerEvents="none"
        >
          <BekkChristmasLogo width="100px" fill="brand.darkGreen" />
        </Box>
      </Container>
    </Flex>
  );
};
