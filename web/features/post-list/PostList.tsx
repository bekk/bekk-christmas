import React, { createRef } from "react";
import { Flex, Box, Heading, HStack } from "@chakra-ui/react";
import { ArticleItem, ArticlePostType } from "./ArticleItem";
import { BackButton } from "./BackButton";
import { ArrowShort } from "./Arrow";
import { Squiggle } from "../shapes/Squiggle";
import { Logo } from "../shapes/Logo";
import { colorCombinations } from "./color-combinations";
import { toDayYear } from "../../utils/date";

type PostListProps = {
  posts: ArticlePostType[];
  heading: string;
  description?: string;
};
export const PostList = ({ posts, heading, description }: PostListProps) => {
  const headingRef = createRef<HTMLDivElement>();
  const scrollButtonRef = createRef<HTMLDivElement>();
  const postListContainerRef = createRef<HTMLDivElement>();

  const headingSpace = 0.4;

  const handleWheel = (e) => {
    const postList = postListContainerRef.current;
    postList.scrollLeft += e.deltaY + e.deltaX;

    const scrollMax = postList.scrollWidth - postList.clientWidth;
    const opacity = postList.scrollLeft / (scrollMax * headingSpace);
    scrollButtonRef.current.style.opacity = opacity.toString();
    headingRef.current.style.opacity = (1 - opacity).toString();
  };

  const scrollToStart = () => {
    scrollButtonRef.current.style.opacity = "0";
    headingRef.current.style.opacity = "1";
    postListContainerRef.current.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  let theme = colorCombinations[0];
  if (posts && posts[0]) {
    const { day } = toDayYear(posts[0].availableFrom);
    theme = colorCombinations[(day - 1) % colorCombinations.length];
  }

  return (
    <Flex
      flexDirection={["column", "row"]}
      height="100vh"
      background={theme.background}
      overflowY="hidden"
      overflowX="hidden"
      color={theme.text}
    >
      <Squiggle
        position="fixed"
        width={["80vw", "70vw", "60vw", "50vw"]}
        transform="translateY(-50%) rotate(-60deg)"
        top="50%"
        pointerEvents="none"
        right="10vw"
        strokeWidth="100"
        stroke={theme.foreground}
      />
      <Box
        position={["static", "absolute"]}
        zIndex="1"
        top="0"
        left="0"
        padding={["40px", "64px"]}
      >
        <BackButton color="inherit" />
      </Box>
      <Box
        position={["relative", "fixed"]}
        top={["0", "50%"]}
        left={["40px", "64px"]}
        transform={["", "translateY(-50%)"]}
        transition="opacity 0.2s"
        pointerEvents="none"
        ref={headingRef}
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
        overflowX="scroll"
        onWheel={handleWheel}
        ref={postListContainerRef}
      >
        <HStack
          spacing={["16px", "48px"]}
          marginLeft={["0", `${100 * headingSpace}vw`]}
        >
          {posts.map((post, index) => {
            switch (post._type) {
              case "post":
                return <ArticleItem key={post.slug} {...post} />;
              default:
                console.log("Unknown _type found", post);
                throw Error("Unknown post type found");
            }
          })}
        </HStack>
      </Flex>
      <Box
        position={["relative", "absolute"]}
        bottom={["0px", "23%"]}
        left={["40px", "80px"]}
        width="fit-content"
        padding={["1.5rem", "2rem"]}
        background={theme.text}
        borderRadius="50%"
        cursor="pointer"
        opacity="0"
        transition="opacity 0.2s"
        onClick={scrollToStart}
        ref={scrollButtonRef}
      >
        <ArrowShort
          stroke={theme.background}
          width={["32px", "50px"]}
          height={["32px", "50px"]}
          transform="rotate(180deg)"
        />
      </Box>
      <Box
        position={["fixed"]}
        alignSelf="flex-end"
        bottom={["40px", "50%"]}
        right={["40px", `${100 * headingSpace}%`]}
        transform={["", "translate(200px, 350px)"]}
        pointerEvents="none"
      >
        <Logo width="100px" />
      </Box>
    </Flex>
  );
};
