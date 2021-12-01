import { Image } from "@chakra-ui/image";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { urlFor } from "../../utils/sanity/utils";
import { getSeparator } from "../../utils/string";
import { ContentPortableText } from "../portable-text/ContentPortableText";
import { DescriptionPortableText } from "../portable-text/DescriptionPortableText";
import { AnchorFmPodcastBlock } from "../portable-text/serializers/AnchorFmPodcastBlock";
import { VimeoBlock } from "../portable-text/serializers/VimeoBlock";

type ArticleBodyProps = {
  type?: "article" | "podcast" | "video";
  embedUrl?: string;
  title: string;
  categories: { name: string; slug: string }[];
  readingTime?: string;
  description?: unknown[];
  authors?: { fullName: string }[];
  publishedAt?: string;
  coverImage: string;
  content: unknown[];
};
export const ArticleBody = ({
  type,
  embedUrl,
  title,
  categories,
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
      mx="auto"
      maxWidth="container.lg"
      mb={[0, 0, "72px"]}
      mt={["40px", "40px", "60px"]}
    >
      <Box marginBottom="20px">
        {categories?.map((category, index) => (
          <React.Fragment key={category.slug}>
            <Link href={`/category/${category.slug}`} passHref>
              <Box
                as="a"
                fontSize={"lg"}
                marginBottom="16px"
                textTransform="uppercase"
              >
                {category.name}
              </Box>
            </Link>
            {getSeparator(index, categories)}
          </React.Fragment>
        ))}
        <Heading
          as="h1"
          fontSize={["5xl", "5xl", "6xl"]}
          fontWeight="normal"
          lineHeight="1.15"
        >
          {title}
        </Heading>
      </Box>

      <Box fontSize="24px" mb={4} maxWidth="60ch">
        <DescriptionPortableText blocks={description} />
      </Box>
      <Flex flexWrap="wrap" fontSize="18px" mb={6}>
        {type !== "podcast" && (
          <>
            <Text fontWeight="bold" mb={[2, 0]}>
              {readingTime}
            </Text>
            <Text px="8px">&middot;</Text>
          </>
        )}
        <Text mb={[2, 0]}>
          {authors?.length
            ? `By ${authors.map((author) => author.fullName).join(", ")}`
            : null}
        </Text>
        <Text display={["none", "block"]} px="8px">
          &middot;
        </Text>
        <Text color="brand.gray">{publishedAt}</Text>
      </Flex>

      {type === "podcast" && <AnchorFmPodcastBlock node={{ src: embedUrl }} />}
      {coverImageSrc && (
        <Image
          margin="40px auto"
          maxHeight="400px"
          maxWidth="80ch"
          width="100%"
          objectFit="cover"
          src={coverImageSrc}
          alt=""
          borderRadius="20px"
        />
      )}
      {type === "video" && <VimeoBlock node={{ src: embedUrl }} />}
      {content && <ContentPortableText blocks={content} />}
    </Container>
  );
};
