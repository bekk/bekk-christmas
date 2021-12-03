import { Box, Container, Flex } from "@chakra-ui/react";
import React from "react";
import { BekkChristmasLogo } from "../design-system/BekkChristmasLogo";
import { BackButton } from "../post-list/BackButton";

type ArticleHeaderProps = { backButtonHref?: string; backButtonText: string };
export const ArticleHeader = ({
  backButtonHref,
  backButtonText,
}: ArticleHeaderProps) => {
  return (
    <Flex as="header" minHeight="15vh" alignItems="center">
      <Container maxWidth="container.lg">
        <BackButton
          color="brand.darkGreen"
          href={backButtonHref}
          fontSize={["24px", "41px"]}
          fontFamily="Newzald"
        >
          {backButtonText}
        </BackButton>
        <Box
          position="absolute"
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
