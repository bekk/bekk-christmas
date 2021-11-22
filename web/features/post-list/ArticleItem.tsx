import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { urlFor } from "../../utils/sanity/utils";
import { Image } from "@chakra-ui/image";
import Link from "next/link";
import readingTime from "reading-time";
import { ArrowShort } from "./Arrow";
import { toDayYear } from "../../utils/date";
import { DescriptionPortableText } from "../portable-text/DescriptionPortableText";

export type ArticlePostType = {
  _type: "post";
  slug: string;
  title: string;
  plaintextContent: string;
  tags: { name: string; slug: string }[];
  availableFrom: string;
  description: unknown[];
  coverImage: string;
};

export const ArticleItem = (post: ArticlePostType) => {
  const { year, day } = toDayYear(post.availableFrom);
  const coverImageSrc = urlFor(post.coverImage).width(800).url()!;
  return (
    <Link href={`/post/${year}/${day}/${post.slug}`} passHref>
      <Flex
        cursor="pointer"
        position="relative"
        flexDirection="column"
        background="brand.white"
        padding={["24px 16px", "32px"]}
        width={["220px", "300px"]}
        height={["300px", "430px"]}
        color="brand.darkGreen"
        boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
        transition="transform 0.2s, background 0.2s"
        _hover={{
          transform: "scale(1.05)",
          background: "brand.pink",
        }}
      >
        <Text mb="12px" fontSize="14px">
          <Box
            display="inline-block"
            background="brand.salmon"
            width="0.65em"
            height="0.65em"
            marginRight="8px"
            borderRadius="50%"
          />
          {readingTime(post.plaintextContent || "").text} –{" "}
          {post.tags?.map((tag) => tag.name).join(", ")}
        </Text>
        {coverImageSrc && (
          <Image
            src={coverImageSrc}
            alt=""
            borderRadius="8px"
            maxHeight={["75px", "150px"]}
            objectFit="cover"
            mb="12px"
          />
        )}
        <Heading
          as="h2"
          fontWeight="400"
          fontSize={coverImageSrc ? ["20px", "22px"] : ["24px", "30px"]}
          marginBottom={coverImageSrc ? "6px" : "12px"}
          title={post.title}
          noOfLines={[coverImageSrc ? 3 : 4, 4]}
        >
          {post.title}
        </Heading>
        <Text noOfLines={[coverImageSrc ? 1 : 2, 2]}>
          <DescriptionPortableText blocks={post.description} />
        </Text>

        <ArrowShort
          position="absolute"
          bottom="24px"
          right="24px"
          width="40px"
        />
      </Flex>
    </Link>
  );
};
