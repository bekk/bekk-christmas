import {
  Box,
  BoxProps,
  Center,
  Grid,
  GridItem,
  Heading,
  Image,
  ImageProps,
  ListItem,
  OrderedList,
  Stack,
  Text,
} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { groq } from "next-sanity";
import Link from "next/link";
import React from "react";
import readingTime from "reading-time";
import { ArticleBackButton } from "../../../../features/article/ArticleBackButton";
import { SiteMetadata } from "../../../../features/layout/SiteMetadata";
import { getClient } from "../../../../utils/sanity/sanity.server";
import { theme } from "../../../../utils/theme";

type ArticlePostType = {
  _id: string;
  _type: "post";
  title: string;
  plaintextContent: string;
  tags: { name: string; slug: string }[];
};

type ArtworkPostType = ImageProps & {
  _type: "artwork";
  src: string;
  alt: string;
};

type PostsForDayProps = {
  posts: ArticlePostType[];
  day: number;
  year: number;
};
export default function PostsForDay({ posts, day, year }: PostsForDayProps) {
  const postsWithIllustrations = decorateWithArtworkEntries(posts);
  return (
    <Box>
      <SiteMetadata
        title={`Posts for day ${day}, ${year}`}
        description={`Check out all ${posts.length} posts from Bekk on day ${day} of the ${year} Christmas season`}
      />
      <Grid
        overflowX={["scroll"]}
        gridAutoFlow={["row", "column"]}
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(6, 1fr)"
        height="100vh"
      >
        <GridItem rowSpan={2} colSpan={3} minWidth="570px" position="relative">
          <Center
            background="brand.midGreen"
            color="white"
            flexDirection="column"
            height="100%"
            p={10}
          >
            <ArticleBackButton position="absolute" top={10} left={10} />
            <Stack>
              <Heading as="h1" fontWeight="400">
                Posts for day {day}, {year}
              </Heading>
              <Text fontSize="xl">
                On the {day + getDayEnding(day)} day of Christmas, Bekk
                Christmas sent to me…
              </Text>
              <OrderedList pl={6} fontSize="xl">
                {posts.map((post) => (
                  <ListItem key={post._id}>{post.title}</ListItem>
                ))}
              </OrderedList>
              <Text fontSize="xl">Dig in!</Text>
            </Stack>
          </Center>
        </GridItem>
        {postsWithIllustrations.map((post, index) => {
          switch (post._type) {
            case "post":
              return (
                <ArticleGridItem
                  key={post._id}
                  post={post}
                  year={year}
                  day={day}
                  index={index}
                />
              );
            case "artwork":
              return <ArtworkGridItem key={index} post={post} index={index} />;
            default:
              console.log("Unknown _type found", post);
              throw Error("Unknown post type found");
          }
        })}
      </Grid>
    </Box>
  );
}
type ArticleGridItemProps = {
  post: ArticlePostType;
  year: number;
  day: number;
  index: number;
};
const ArticleGridItem = ({ post, year, day, index }: ArticleGridItemProps) => {
  return (
    <Link key={post._id} href={`/post/${year}/${day}/${post._id}`} passHref>
      <GridItem
        as="a"
        backgroundColor={
          colorCombinations[index % colorCombinations.length].background
        }
        color={colorCombinations[index % colorCombinations.length].foreground}
        p={10}
        pb={6}
        position="relative"
        minWidth="368px"
      >
        <Text mb="24px">
          {readingTime(post.plaintextContent).text} –{" "}
          {post.tags.map((tag) => tag.name).join(", ")}
        </Text>
        <Heading as="h2" fontWeight="400" fontSize="48px" lineHeight="54px">
          {post.title}
        </Heading>
        <ArrowIcon
          position="absolute"
          bottom="24px"
          right="24px"
          width="24px"
          height="16px"
        />
      </GridItem>
    </Link>
  );
};

type ArtworkGridItemProps = {
  post: ArtworkPostType;
  index: number;
};
const ArtworkGridItem = ({ index, post }: ArtworkGridItemProps) => {
  const { _type, ...imageProps } = post;
  return (
    <GridItem
      backgroundColor={
        colorCombinations[index % colorCombinations.length].background
      }
      color={colorCombinations[index % colorCombinations.length].foreground}
      px={10}
      position="relative"
      minWidth="368px"
    >
      <Image
        width="100%"
        maxHeight="300px"
        objectFit="contain"
        alt={imageProps.alt /*To avoid an eslint error */}
        {...imageProps}
      />
    </GridItem>
  );
};

const decorateWithArtworkEntries = (posts: PostsForDayProps["posts"]) => {
  const copyOfPosts: (ArticlePostType | ArtworkPostType)[] = [...posts];
  const arts = [
    {
      index: 2,
      src: "/illustrations/branch-with-white-berries.svg",
      alt: "A branch with white berries",
    },
    {
      index: 5,
      src: "/illustrations/man-working-at-computer.svg",
      alt: "A man working at his computer",
      mt: "40px",
    },
    {
      index: 8,
      src: "/illustrations/man-looking-at-phone.svg",
      alt: "A man looking at his phone",
      mt: "40px",
    },
    {
      index: 11,
      src: "/illustrations/branch-with-white-berries.svg",
      alt: "A branch with white berries",
    },
    {
      index: 14,
      src: "/illustrations/man-and-woman-looking-at-phones.svg",
      alt: "A man and a woman, looking at their phones.",
      mt: "40px",
    },
  ];
  arts.forEach(({ index, ...artProps }) => {
    if (index <= copyOfPosts.length) {
      copyOfPosts.splice(index, 0, {
        _type: "artwork",
        ...artProps,
      });
    }
  });
  return copyOfPosts;
};

const colorCombinations = [
  {
    background: theme.colors.brand.darkGreen,
    foreground: theme.colors.white,
  },
  {
    background: theme.colors.brand.red,
    foreground: theme.colors.white,
  },
  {
    background: theme.colors.brand.peach,
    foreground: theme.colors.brand.red,
  },

  {
    background: theme.colors.brand.lightGreen,
    foreground: theme.colors.brand.darkGreen,
  },

  {
    background: theme.colors.white,
    foreground: theme.colors.brand.darkGreen,
  },
];

const ArrowIcon = (props: BoxProps) => {
  return (
    <Box as="svg" viewBox="0 0 24 16" {...props}>
      <path
        d="m16.25 0-.68.69 6.58 6.57H0v.97h22.15l-6.58 6.58.68.69L24 7.75 16.25 0Z"
        fill="currentColor"
      />
    </Box>
  );
};

const getDayEnding = (day: number) => {
  switch (day) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const days = Array(24)
    .fill(0)
    .map((_, i) => i + 1);

  type Post = { availableFrom: string };
  const allPosts = await getClient().fetch<Post[]>(
    groq`*[_type == "post"] { availableFrom }`
  );

  const uniqueYears = [
    ...new Set(
      allPosts.map((post) => new Date(post.availableFrom).getFullYear())
    ),
  ];

  const paths = uniqueYears.flatMap((year) =>
    days.map((day) => `/post/${year}/${day}`)
  );

  return {
    paths,
    fallback: "blocking",
  };
};

const FIRST_DAY_OF_CHRISTMAS = 1;
const LAST_DAY_OF_CHRISTMAS = 24;
const FIRST_CONTENT_YEAR = 2016;
// TODO: This should probably be calculated from the latest post
const LATEST_CONTENT_YEAR = 2021;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const day = Number(params?.day);
  const isValidDay =
    day >= FIRST_DAY_OF_CHRISTMAS || day <= LAST_DAY_OF_CHRISTMAS;
  const year = Number(params?.year);
  const isValidYear = year >= FIRST_CONTENT_YEAR && year <= LATEST_CONTENT_YEAR;

  if (!isValidDay || !isValidYear) {
    return { notFound: true };
  }

  const beginningOfDay = new Date(year, 11, day);
  const endOfDay = new Date(year, 11, day, 23, 59, 59);

  const postsPublishedForDay = await getClient().fetch(
    groq`*[_type == "post" 
    && availableFrom >= $beginningOfDay 
    && availableFrom < $endOfDay] {
       _id, 
      _type,
      title, 
      "plaintextContent": pt::text(content), 
      tags[]->{ name, slug }
      }`,
    { beginningOfDay, endOfDay }
  );

  return {
    props: {
      posts: postsPublishedForDay,
      day,
      year,
    },
    revalidate: 60,
  };
};
