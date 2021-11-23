import { Image } from "@chakra-ui/image";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { urlFor } from "../../utils/sanity/utils";
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
    <Container mx="auto" pb="120px" maxWidth="container.lg">
      <Box marginBottom="20px">
        {category && (
          <Box fontSize={"lg"} marginBottom="16px">
            {category.toUpperCase()}
          </Box>
        )}
        <Heading as={"h1"} size={"4xl"} fontWeight="normal" lineHeight="1.15">
          {title}
        </Heading>
      </Box>
      <Flex flexWrap="wrap" fontSize="24px">
        <Text fontWeight="bold" mb={[2, 0]}>
          {readingTime}
        </Text>
        <Text display={["none", "block"]} px="8px">
          &middot;
        </Text>
        <Text mb={[2, 0]}>
          {authors?.length
            ? "Written by " +
              authors.map((author) => author.fullName).join(", ")
            : "No authors"}
        </Text>
        <Text display={["none", "block"]} px="8px">
          &middot;
        </Text>
        <Text fontSize="24px" color="brand.gray">
          {publishedAt}
        </Text>
      </Flex>
      <Box marginLeft={[0, 0, "240px"]} my="72px">
        {description && (
          <Box fontSize="2xl">
            <DescriptionPortableText blocks={description} />
          </Box>
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
