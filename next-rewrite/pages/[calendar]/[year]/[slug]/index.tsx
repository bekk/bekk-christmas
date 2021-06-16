import {
  Box,
  Container,
  Heading,
  Image,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import readingTime from "reading-time";
import { Layout } from "../../../../features/layout/Layout";
import { ArticleMarkdown } from "../../../../features/markdown/ArticleMarkdown";
import { IngressMarkdown } from "../../../../features/markdown/IngressMarkdown";
import {
  Article,
  getAllArticles,
  getArticleData,
} from "../../../../utils/data";

export default function BlogPostPage({
  title,
  ingress,
  ingressWithoutMarkdown,
  content,
  image,
  authors,
  post_day,
  post_year,
}: Article) {
  return (
    <Layout
      title={`${title} - bekk.christmas`}
      description={ingressWithoutMarkdown}
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
            fallback={<Skeleton height="500vh" />}
          />
        )}
        <Stack as="article" mt={6}>
          <Box as="header" textAlign="center">
            <Container>
              <Heading as="h1" fontSize="4xl">
                {title}
              </Heading>
            </Container>
            <Text mb={12} mt={3}>
              A {readingTime(content).text} written by
              <br />
              <strong>{new Intl.ListFormat("en").format(authors)}</strong>
              <br />
              {post_day}.12.{post_year}
            </Text>
            {ingress && (
              <Container
                maxWidth="container.md"
                mx="auto"
                fontSize="2xl"
                textAlign="center"
              >
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
  return {
    props: getArticleData({
      calendar: String(calendar),
      year: Number(year),
      day: Number(slug),
    }),
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allArticles = getAllArticles();
  return {
    paths: allArticles.map(
      (article) =>
        `/${article.calendar}/${article.post_year}/${article.post_day}`
    ),
    fallback: "blocking",
  };
};
