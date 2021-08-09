import {
  Box,
  Center,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import * as React from "react";
import { Article } from "../../utils/data";
import {
  getGeneratedArtForArticle,
  getGeneratedArtPreviewForArticle,
} from "../../utils/generated-art";
import { BrokenBalls } from "../broken-balls/BrokenBalls";
import { Image } from "../design-system/Image";
import { TextLink } from "../design-system/TextLink";

type CalendarProps = {
  name: string;
  otherYears: number[];
  articles: Article[];
};
/** This shows a grid of 24 articles!
 */
export const Calendar = ({ name, otherYears, articles }: CalendarProps) => {
  if (articles.length === 0) {
    return (
      <Box>
        <Box maxWidth="380px" width="80%" mx="auto">
          <BrokenBalls />
        </Box>
        <Heading as="h2" textAlign="center" mt={6} mb={6}>
          Sorry, we couldn't find that {otherYears.length ? "year" : "calendar"}
          !
        </Heading>
        {otherYears.length > 0 ? (
          <Text textAlign="center" fontSize="lg" my={6}>
            However, check out the calendar{otherYears.length > 1 && "s"} for{" "}
            {otherYears.map((year, index) => (
              <React.Fragment key={index}>
                <TextLink href={`/${name}/${year}`}>{year}</TextLink>
                {otherYears.length > 1 && index < otherYears.length - 2 && ", "}
                {otherYears.length > 1 &&
                  index === otherYears.length - 2 &&
                  " and "}
              </React.Fragment>
            ))}
            !
          </Text>
        ) : (
          <Text textAlign="center" fontSize="lg" my={6}>
            Go <TextLink href="/">back to start</TextLink> to find an existing
            calendar!
          </Text>
        )}
      </Box>
    );
  }
  return (
    <Box>
      <SimpleGrid
        columns={[1, 2, 3]}
        columnGap={3}
        rowGap={9}
        maxWidth="1200px"
        mx="auto"
        p={3}
      >
        {articles.map((article) => (
          <ArticleEntrance
            key={article.post_day}
            calendar={article.calendar}
            title={article.title}
            year={article.post_year}
            day={article.post_day}
            isAvailable={article.isAvailable}
          />
        ))}
      </SimpleGrid>
      {otherYears.length > 0 && (
        <Text textAlign="center" fontSize="lg" my={6}>
          Also check out the calendar{otherYears.length > 1 && "s"} for{" "}
          {otherYears.map((year, index) => (
            <React.Fragment key={index}>
              <TextLink href={`/${name}/${year}`}>{year}</TextLink>
              {otherYears.length > 1 && index < otherYears.length - 2 && ", "}
              {otherYears.length > 1 &&
                index === otherYears.length - 2 &&
                " and "}
            </React.Fragment>
          ))}
          !
        </Text>
      )}
    </Box>
  );
};

type ArticleEntranceProps = {
  calendar: string;
  year: number;
  day: number;
  title: string;
  isAvailable: boolean;
};
const ArticleEntrance = ({
  calendar,
  year,
  day,
  title,
  isAvailable,
}: ArticleEntranceProps) => {
  const url = `/${calendar}/${year}/${day}`;
  const image = React.useMemo(() => getGeneratedArtForArticle(url), [url]);
  const fallbackImage = React.useMemo(
    () => getGeneratedArtPreviewForArticle(url),
    [url]
  );
  if (!isAvailable) {
    return (
      <Stack>
        <Center height="300px" bgGradient="to-tr(gray.500, gray.300)">
          <Center
            fontSize="5em"
            background="red.300"
            borderRadius="50%"
            width="2em"
            height="2em"
          >
            {day}
          </Center>
        </Center>
      </Stack>
    );
  }

  return (
    <Link href={url}>
      <a>
        <Stack>
          <Box position="relative">
            <Image
              src={image}
              fallback={fallbackImage}
              width="500px"
              height="500px"
              layout="fill"
              objectFit="cover"
              objectPosition="center center"
              alt={title}
            />
            <Flex
              position="absolute"
              top="1em"
              right="1em"
              borderRadius="50%"
              width="2em"
              height="2em"
              fontSize="xl"
              alignItems="center"
              justifyContent="center"
              background="red.300"
              border="2px solid"
              borderColor="red.800"
              aria-label={`Day ${day}`}
            >
              {day}
            </Flex>
          </Box>
          <Heading as="h3" fontSize="2xl">
            {title}
          </Heading>
        </Stack>
      </a>
    </Link>
  );
};
