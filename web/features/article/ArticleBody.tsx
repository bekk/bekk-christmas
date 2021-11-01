import { Image } from "@chakra-ui/image";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { urlFor } from "../../utils/sanity/utils";
import { Space } from "../design-system/Space";
import { ContentPortableText } from "../portable-text/ContentPortableText";
import { DescriptionPortableText } from "../portable-text/DescriptionPortableText";

type ArticleBodyProps = {
  title: string;
  category: string;
  readingTime?: string;
  description?: unknown[];
  authors?: { fullName: string }[];
  publishedAt?: string;
  coverImage: string;
  content: unknown[];
};
export const ArticleBody = ({
  title,
  category,
  readingTime,
  description,
  content,
  authors,
  publishedAt,
  coverImage,
}: ArticleBodyProps) => {
  const coverImageSrc = urlFor(coverImage).width(800).url()!;
  return (
    <Container
      backgroundColor="white"
      color="brand.midGrey"
      margin="120px auto 80px"
      maxWidth="container.lg"
    >
      <Box marginBottom="80px">
        {category && (
          <Box fontSize={"lg"} marginBottom="16px">
            {category}
          </Box>
        )}
        <Heading
          as={"h1"}
          size={"4xl"}
          fontWeight="normal"
          lineHeight="1.15"
          color="brand.darkGrey"
        >
          {title}
        </Heading>
      </Box>
      <Box
        marginLeft={[0, 0, "240px"]}
        marginBottom="80px"
        color="brand.darkGrey"
      >
        <Flex flexWrap="wrap">
          <Text>{readingTime}</Text>
          <Text px={2}>-</Text>
          <Text>
            {authors
              ? "Written by " +
                authors.map((author) => author.fullName).join(", ")
              : "No authors"}
          </Text>
          {authors && publishedAt && <Text px={2}>-</Text>}
          {publishedAt}
        </Flex>
        {description && (
          <>
            <Space />
            <Box fontSize="2xl">
              <DescriptionPortableText blocks={description} />
            </Box>
          </>
        )}
      </Box>
      {coverImageSrc && (
        <Image
          marginLeft={[0, 0, "120"]}
          marginTop="80px"
          marginBottom="80px"
          src={coverImageSrc}
          alt=""
          borderRadius="20px"
        />
      )}
      {content ? (
        <ContentPortableText blocks={content} />
      ) : (
        <Text>No content</Text>
      )}
    </Container>
  );
};
