import React from "react";
import { Container, Box, Flex } from "@chakra-ui/react";
import { BekkChristmasLogo } from "../design-system/BekkChristmasLogo";
import { BackButton } from "../post-list/BackButton";
import { shortDateFormat } from "../../utils/date";

export const ArticleHeader = ({ publishedAt }: { publishedAt: Date }) => {
  return (
    <Flex as="header" minHeight="15vh" alignItems="center">
      <Container maxWidth="container.lg">
        <BackButton
          color="brand.darkGreen"
          href={
            "/post/" + publishedAt.getFullYear() + "/" + publishedAt.getDate()
          }
        >
          {shortDateFormat(publishedAt)}
        </BackButton>
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
