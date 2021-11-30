import { Box, Center, Flex, Image } from "@chakra-ui/react";
import React from "react";
import { HypeButton } from "../hype/HypeButton";

type ArticleFooterProps = { showHype: boolean };
export const ArticleFooter = ({ showHype }: ArticleFooterProps) => {
  return (
    <>
      {showHype && (
        <HypeButton
          position={["static", "static", "fixed"]}
          bottom="5rem"
          left="1rem"
        />
      )}
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
