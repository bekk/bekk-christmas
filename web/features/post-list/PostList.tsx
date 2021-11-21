import React, { createRef } from "react";
import { Flex, Box, HStack } from "@chakra-ui/react";
import { ArticleItem, ArticlePostType } from "./ArticleItem";
import { BackButton } from "./BackButton";
import { Squiggle } from "../shapes/Squiggle";

type PostListProps = {
  posts: ArticlePostType[];
  children?: React.ReactNode;
};
export const PostList = ({ posts, children }: PostListProps) => {
  const headingRef = createRef<HTMLDivElement>();
  const headingSpace = 0.4;
  let scroll = 0;
  let headingOpacity = 1;

  const handleWheel = (e) => {
    const max = e.currentTarget.offsetWidth - window.innerWidth;
    scroll = Math.max(0, Math.min(scroll + e.deltaY, max));
    e.currentTarget.style.transform = `translateX(-${Math.min(scroll, max)}px)`;

    const newOpacity = 1 - scroll / (window.innerWidth * headingSpace);
    headingRef.current.style.opacity = newOpacity.toString();
  };

  return (
    <Flex
      height="100vh"
      overflowY="hidden"
      overflowX="hidden"
      background="new.darkGreen"
    >
      <BackButton position="absolute" zIndex="1" top="48px" left="48px" />
      <Box
        position="fixed"
        top="50%"
        left="64px"
        transform="translateY(-50%)"
        color="new.pink"
        pointerEvents="none"
        opacity={headingOpacity}
        ref={headingRef}
        transition="opacity 0.2s"
      >
        {children}
      </Box>
      <Squiggle
        position="fixed"
        width="50vw"
        transform="translateY(-50%) rotate(-60deg)"
        top="50%"
        pointerEvents="none"
        right="10vw"
        strokeWidth="100"
      />
      <Flex
        transition="transform 0.2s"
        alignItems="center"
        px="48px"
        onWheel={handleWheel}
      >
        <HStack
          spacing="48px"
          height="430px"
          marginLeft={`${100 * headingSpace}vw`}
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
    </Flex>
  );
};
