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
import SubscribeModal from "../subscribe/SubscribeModal";

type ArticleBodyProps = {
  type?: "article" | "podcast" | "video";
  embedUrl?: string;
  title: string;
  categories: { name: string; slug: string }[];
  consumptionTime?: string;
  description?: unknown[];
  authors?: { fullName: string }[];
  publishedAt?: string;
  coverImage?: {
    _type: "image";
    hideFromPost?: boolean;
    asset: Record<string, any>;
  };
  content: unknown[];
};
export const ArticleBody = ({
  type,
  embedUrl,
  title,
  categories,
  consumptionTime,
  description,
  content,
  authors,
  publishedAt,
  coverImage,
}: ArticleBodyProps) => {
  return (
    <Container maxWidth="container.lg" mt={["40px", "40px", "60px"]}>
      <Box mb={4}>
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
      <Flex
        alignItems="center"
        flexWrap="wrap"
        gridGap="0.5rem"
        fontSize="18px"
        mb={6}
      >
        <Text fontWeight="bold">{consumptionTime}</Text>
        <Text>&middot;</Text>
        <Text>
          {authors?.length
            ? `By ${authors.map((author) => author.fullName).join(", ")}`
            : null}
        </Text>
        <Text>&middot;</Text>
        <Text color="brand.gray">{publishedAt}</Text>
        <SubscribeModal marginLeft="auto" />
      </Flex>

      {type === "podcast" && <AnchorFmPodcastBlock node={{ src: embedUrl }} />}
      {coverImage && (
        <Image
          margin="40px auto"
          maxHeight="400px"
          maxWidth="80ch"
          width="100%"
          objectFit="cover"
          src={urlFor(coverImage).width(800).url()}
          srcSet={`${urlFor(coverImage).width(400).url()} 400w, ${urlFor(
            coverImage
          )
            .width(800)
            .url()} 800w, ${urlFor(coverImage)
            .width(1200)
            .url()} 1200w, ${urlFor(coverImage).width(1600).url()} 1600w`}
          sizes="(max-width: 80ch) 100vw, 80ch"
          alt=""
          borderRadius="20px"
        />
      )}
      {type === "video" && <VimeoBlock node={{ src: embedUrl }} />}
      {content && <ContentPortableText blocks={content} />}
    </Container>
  );
};
