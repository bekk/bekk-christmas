import { Box, Container, Heading, Image, Skeleton, Stack, Text } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import readingTime from "reading-time";
import { Layout } from "../../../../features/layout/Layout";
import { ArticleMarkdown } from "../../../../features/markdown/ArticleMarkdown";
import { IngressMarkdown } from "../../../../features/markdown/IngressMarkdown";
import { calendarInfo } from "../../../../utils/calendars";
import { Article, getAllArticles, getArticleData } from "../../../../utils/data";

export default function BlogPostPage({
  calendar,
  title,
  ingress,
  ingressWithoutMarkdown,
  content,
  image,
  authors,
  post_day,
  post_year,
  isAvailable,
}: Article) {
  if (!isAvailable) {
    return (
      <Layout
        title="Not available yet!"
        description="This article isn't available yet"
        headerLink={`/${calendar}/${post_year}`}
      >
        <Stack textAlign="center">
          <Heading as="h1" fontSize="6xl">
            Article isn&apos;t available yet
          </Heading>
          <Text>Please check back in a few.</Text>
        </Stack>
      </Layout>
    );
  }
  const { displayName } = calendarInfo[calendar];
  return (
    <Layout
      title={`${title} - bekk.christmas`}
      description={ingressWithoutMarkdown}
      headerLink={`/${calendar}/${post_year}`}
      headerTitle={`Bekk Christmas / ${displayName} (${post_year})`}
    >
      <Box>
        {image && (
          <Image
            src={image}
            alt={title}
            width="100%"
            maxWidth="1200px"
            mx="auto"
            height="50vh"
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
            fallback={<Skeleton height="50vh" maxWidth="1200px" mx="auto" />}
          />
        )}
        <Stack as="article" mt={6}>
          <Box as="header" textAlign="center">
            <Container maxWidth="container.lg">
              <Heading as="h1" fontSize="6xl">
                {title}
              </Heading>
            </Container>
            <Text mb={12} mt={3}>
              A {readingTime(content).text}{" "}
              {authors?.length > 0 && (
                <>
                  written by
                  <br />
                  <strong>{new Intl.ListFormat("en").format(authors)}</strong>
                </>
              )}
              <br />
              {post_day}.12.{post_year}
            </Text>
            {ingress && (
              <Container maxWidth="container.md" mx="auto" fontSize="2xl" textAlign="center">
                <IngressMarkdown>{ingress}</IngressMarkdown>
              </Container>
            )}
          </Box>
          <Box fontSize="lg">
            <ArticleMarkdown>{content}</ArticleMarkdown>
          </Box>
        </Stack>
      </Box>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { calendar, year, slug } = context.params;
  const articleData = getArticleData({
    calendar: String(calendar),
    year: Number(year),
    day: Number(slug),
  });
  return {
    props: articleData,
    revalidate: 60,
    notFound: !articleData,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allArticles = getAllArticles();
  return {
    paths: allArticles.map(
      (article) => `/${article.calendar}/${article.post_year}/${article.post_day}`
    ),
    fallback: "blocking",
  };
};
