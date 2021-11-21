import React, { createRef } from "react";
import { Flex, Box, Text, Heading, HStack } from "@chakra-ui/react";
import { ArticleItem, ArticlePostType } from "./ArticleItem";
import { BackButton } from "./BackButton";
import { Squiggle } from "../shapes/Squiggle";
import { Logo } from "../shapes/Logo";

type PostListProps = {
  posts: ArticlePostType[];
  heading: string;
  description?: string;
};
export const PostList = ({ posts, heading, description }: PostListProps) => {
  const headingRef = createRef<HTMLDivElement>();
  const headingSpace = 0.4;
  let scroll = 0;
  let headingOpacity = 1;

  const handleWheel = (e) => {
    const max = e.currentTarget.offsetWidth - window.innerWidth;
    scroll = Math.max(0, Math.min(scroll + e.deltaY + e.deltaX, max));
    e.currentTarget.style.transform = `translateX(-${Math.min(scroll, max)}px)`;

    const newOpacity = 1 - scroll / (window.innerWidth * headingSpace);
    headingRef.current.style.opacity = newOpacity.toString();
  };

  return (
    <Flex
      flexDirection={["column", "row"]}
      minHeight="100vh"
      overflowY="hidden"
      overflowX="hidden"
      background="new.darkGreen"
    >
      <Squiggle
        position="fixed"
        width={["80vw", "70vw", "60vw", "50vw"]}
        transform="translateY(-50%) rotate(-60deg)"
        top="50%"
        pointerEvents="none"
        right="10vw"
        strokeWidth="100"
      />
      <Box
        position={["static", "absolute"]}
        zIndex="1"
        top="0"
        left="0"
        padding={["40px", "64px"]}
      >
        <BackButton />
      </Box>
      <Box
        position={["relative", "fixed"]}
        top="50%"
        left={["40px", "64px"]}
        transform={["", "translateY(-50%)"]}
        color="new.pink"
        ref={headingRef}
        opacity={headingOpacity}
        transition="opacity 0.2s"
        pointerEvents="none"
      >
        <Heading
          as="h1"
          fontWeight="400"
          fontSize={["4rem", "5rem", "6rem", "10rem"]}
          lineHeight="1"
          mb={["12px", "12px", "24px", "12px"]}
        >
          {heading}
        </Heading>
        <Heading
          as="h2"
          fontWeight="400"
          fontSize={["2rem", "2rem", "2rem", "3rem"]}
          lineHeight="1"
        >
          {description}
        </Heading>
      </Box>

      <Flex
        transition="transform 0.2s"
        alignItems="center"
        padding={["40px", "48px"]}
        width="fit-content"
        onWheel={handleWheel}
      >
        <HStack
          spacing={["16px", "48px"]}
          marginLeft={["0", `${100 * headingSpace}vw`]}
        >
          {posts.map((post, index) => {
            switch (post._type) {
              case "post":
                return (
                  <ArticleItem key={post.slug} post={post} index={index} />
                );
              default:
                console.log("Unknown _type found", post);
                throw Error("Unknown post type found");
            }
          })}
        </HStack>
      </Flex>
      <Box
        position={["relative", "fixed"]}
        alignSelf="flex-end"
        bottom={["0", "50%"]}
        right={["40px", `${100 - 100 * headingSpace}%`]}
        transform={["", "translate(200px, 350px)"]}
      >
        <Logo width="100px" />
      </Box>
    </Flex>
  );
};
