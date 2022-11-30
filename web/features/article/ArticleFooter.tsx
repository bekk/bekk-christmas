import { Box, Center, Container, Flex, Image, Spacer } from "@chakra-ui/react";
import React from "react";
import { HypeButton } from "../hype/HypeButton";
import { BackButton } from "../post-list/BackButton";
import Subscribe from "../subscribe/Subscribe";

type ArticleFooterProps = {
  backButtonHref: string;
  backButtonText: string;
};
export const ArticleFooter = ({
  backButtonHref,
  backButtonText,
}: ArticleFooterProps) => {
  return (
    <>
      <Container maxWidth="80ch" px={[3, 3, 0]}>
        <HypeButton height="121px" />
        <BackButton
          color="brand.darkGreen"
          href={backButtonHref}
          fontSize={["18px", "18px", "24px"]}
          fontFamily="Newzald"
          my="54px"
        >
          {"Read more from " + backButtonText}
        </BackButton>
      </Container>
      <Subscribe my="6rem" w="fit-content" mx="auto" />
      <Center boxShadow="0 0 10px 5px #8C8C8C50" backgroundColor="white" p={5}>
        <Box>
          <Flex justifyContent="center" alignItems="center">
            Proudly powered by{" "}
            <a href="https://sanity.io" rel="noopener noreferrer">
              <Image
                src="/logos/sanity.svg"
                alt="Sanity.io"
                title="Sanity"
                width="5rem"
                ml={2}
                display="inline-block"
                position="relative"
                top="-2px"
              />
            </a>
          </Flex>
        </Box>
      </Center>
    </>
  );
};
