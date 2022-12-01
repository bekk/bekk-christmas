import { Box, Flex, Heading, HStack } from "@chakra-ui/react";
import React from "react";
import { toDayYear } from "../../utils/date";
import { BekkChristmasLogo } from "../design-system/BekkChristmasLogo";
import { Squiggle } from "../shapes/Squiggle";
import Subscribe from "../subscribe/Subscribe";
import { ArrowShort } from "./Arrow";
import { ArticleItem, ArticleItemType } from "./ArticleItem";
import { BackButton } from "./BackButton";
import { colorCombinations } from "./color-combinations";
import { PodcastItem, PodcastItemType } from "./PodcastItem";
import { SignupForNewsletterItem } from "./SignupForNewsletterItem";
import { VideoItem, VideoItemType } from "./VideoItem";

type PostListProps = {
  backButtonHref: string;
  backButtonLabel?: string;
  posts: (PodcastItemType | VideoItemType | ArticleItemType)[];
  heading: string;
  description?: string;
};
export const PostList = ({
  backButtonHref,
  backButtonLabel = "Home",
  posts,
  heading,
  description,
}: PostListProps) => {
  const headingRef = React.useRef<HTMLDivElement>();
  const scrollBackButtonRef = React.useRef<HTMLDivElement>();
  const scrollForwardButtonRef = React.useRef<HTMLDivElement>();
  const postListContainerRef = React.useRef<HTMLDivElement>();

  const headingSpace = 0.4;

  const handleWheel = (e: any) => {
    const postList = postListContainerRef.current;
    const scrollMax = postList.scrollWidth - postList.clientWidth;
    postList.scrollLeft += e.deltaY + e.deltaX;

    const opacity = postList.scrollLeft / (scrollMax * headingSpace);
    scrollBackButtonRef.current.style.opacity = opacity.toString();
    scrollForwardButtonRef.current.style.opacity = (1 - opacity).toString();
    headingRef.current.style.opacity = (1 - opacity).toString();
  };

  const scrollToStart = () => {
    scrollBackButtonRef.current.style.opacity = "0";
    scrollForwardButtonRef.current.style.opacity = "1";
    headingRef.current.style.opacity = "1";
    postListContainerRef.current.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  let theme = colorCombinations[1];
  if (posts && posts[0]) {
    const { day } = toDayYear(posts[0].availableFrom);
    theme = colorCombinations[(day - 1) % colorCombinations.length];
  }

  return (
    <>
      <Flex
        flexDirection={["column", "column", "row", "row"]}
        height="100vh"
        background={theme.background}
        overflowY="hidden"
        overflowX="hidden"
        color={theme.text}
      >
        <Squiggle
          position="fixed"
          width={["80vw", "50vw", "50vw", "50vw"]}
          transform="translateY(-50%) rotate(-60deg)"
          top="50%"
          pointerEvents="none"
          left="55vw"
          strokeWidth="150"
          stroke={theme.foreground}
        />
        <Box
          position={["static", "static", "absolute", "absolute"]}
          zIndex="1"
          top="0"
          left="0"
          padding={["40px", "40px", "64px", "64px"]}
        >
          <BackButton color="inherit" href={backButtonHref} fontFamily="DINOT">
            {backButtonLabel}
          </BackButton>
        </Box>
        <Box
          display={posts.length <= 3 && "none"}
          position={["relative", "relative", "absolute", "absolute"]}
          top={["0px", "0px", "200px", "200px"]}
          right={["-36px", "-36px", "60px", "60px"]}
          transition="opacity 0.2s"
          role="group"
          pointerEvents="none"
          ref={scrollForwardButtonRef}
        >
          <BackButton
            color="inherit"
            fontFamily="DINOT"
            fontSize="24px"
            reverseDirection
          >
            Scroll to see more
          </BackButton>
        </Box>
        <Box
          position={["relative", "relative", "fixed", "fixed"]}
          top={["0", "0", "50%", "50%"]}
          left={["40px", "40px", "64px", "64px"]}
          transform={["", "", "translateY(-50%)", "translateY(-50%)"]}
          transition="opacity 0.2s"
          pointerEvents="none"
          ref={headingRef}
        >
          <Heading
            as="h1"
            fontWeight="400"
            fontSize={["4rem", "5rem", "6rem", "9rem"]}
            lineHeight="1"
            mb={["12px", "12px", "24px", "12px"]}
          >
            {heading}
          </Heading>
          <Heading
            as="h2"
            fontWeight="400"
            fontSize={["1.8rem", "2rem", "2rem", "3rem"]}
            lineHeight="1"
          >
            {description}
          </Heading>
        </Box>

        <Flex
          transition="transform 0.2s"
          alignItems="center"
          padding={["40px", "40px", "48px", "48px"]}
          overflowX="scroll"
          onWheel={handleWheel}
          ref={postListContainerRef}
        >
          <HStack
            spacing={["16px", "16px", "48px", "48px"]}
            marginLeft={[
              "0",
              "0",
              `${100 * headingSpace}vw`,
              `${100 * headingSpace}vw`,
            ]}
            marginRight={["10vw", "20vw", "30vw"]}
          >
            {posts.map((post, _) => {
              switch (post.type) {
                case "podcast":
                  return <PodcastItem key={post.slug} {...post} />;
                case "video":
                  return <VideoItem key={post.slug} {...post} />;
                case "article":
                default:
                  return <ArticleItem key={post.slug} {...post} />;
              }
            })}
            <SignupForNewsletterItem
              display={["flex", "flex", "none", "none"]}
            />
            <Subscribe display={["none", "none", "unset", "unset"]} />
          </HStack>
        </Flex>
        <Box
          position={["relative", "relative", "absolute", "absolute"]}
          bottom={["20px", "20px", "80px", "80px"]}
          left={["40px", "40px", "80px", "80px"]}
          width="fit-content"
          padding={["1.5rem", "1.5rem", "2rem", "2rem"]}
          background={theme.text}
          borderRadius="50%"
          cursor="pointer"
          opacity="0"
          transition="opacity 0.2s"
          onClick={scrollToStart}
          ref={scrollBackButtonRef}
          role="group"
        >
          <ArrowShort
            stroke={theme.background}
            width={["32px", "32px", "50px", "50px"]}
            height={["32px", "32px", "50px", "50px"]}
            transform="rotate(180deg)"
            transition="transform 0.4s"
            _groupHover={{
              transform: "rotate(540deg)",
            }}
          />
        </Box>
      </Flex>
      <Box
        position={["fixed"]}
        bottom={"-150px"}
        right={"-150px"}
        pointerEvents="none"
      >
        <BekkChristmasLogo width="300px" fill={theme.logo} />
      </Box>
    </>
  );
};
