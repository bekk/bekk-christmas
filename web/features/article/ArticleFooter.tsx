import { Box, Center, Container, Flex, Image, Spacer } from "@chakra-ui/react";
import React from "react";
import { HypeButton } from "../hype/HypeButton";
import { BackButton } from "../post-list/BackButton";
import RelatedLinks from "../related-links/RelatedLinks";

type ArticleFooterProps = {
  backButtonHref: string;
  backButtonText: string;
  relatedLinks: {
    title: string;
    description: string;
    url: string;
  }[];
};
export const ArticleFooter = ({
  backButtonHref,
  backButtonText,
  relatedLinks,
}: ArticleFooterProps) => {
  return (
    <Container maxWidth="container.lg">
      <Box maxWidth="80ch" mx="auto">
        <Flex alignItems="center" justifyContent="space-between">
          <BackButton
            color="brand.darkGreen"
            href={backButtonHref}
            fontSize={["18px", "18px", "24px"]}
            fontFamily="Newzald"
            my="54px"
            p={0}
          >
            {"Read more from " + backButtonText}
          </BackButton>
          <HypeButton height="121px" />
        </Flex>
        {relatedLinks.length > 0 && (
          <RelatedLinks relatedLinks={relatedLinks} />
        )}
      </Box>
      <Center
        position="relative"
        width="100vw"
        marginLeft="-50vw"
        left="50%"
        boxShadow="0 0 10px 5px #8C8C8C50"
        backgroundColor="white"
        p={5}
      >
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
    </Container>
  );
};
