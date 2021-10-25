import {
  Box,
  Flex,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { PortableText } from "../portable-text/PortableText";
import { Space } from "../design-system/Space";

type ArticleBodyProps = {
  title: string;
  category: string;
  readingTime?: string;
  description?: string;
  authors?: { fullName: string }[];
  publishedAt?: string;
  content: unknown;
};
export const ArticleBody = ({
  title,
  category,
  readingTime,
  description,
  content,
  authors,
  publishedAt,
}: ArticleBodyProps) => {
  return (
    <SimpleGrid
      backgroundColor="white"
      color="brand.darkGrey"
      columns={12}
      spacingX={"32px"}
      margin={"40px"}
    >
      <GridItem colSpan={10} colStart={2}>
        <Space times={3} />
        {category && <Box fontSize={"lg"}>{category}</Box>}
        <Space size={"small"} />
        <Heading as={"h1"} size={"3xl"}>
          {title}
        </Heading>
        <Space times={2} />
      </GridItem>
      <GridItem colSpan={8} colStart={4}>
        <Flex>
          <Box mr={"8px"}>{readingTime}</Box>
          {authors && (
            <strong>
              {authors.map((author) => author.fullName).join(", ") ??
                "No authors"}
            </strong>
          )}
          {authors && publishedAt && " – "}
          {publishedAt}
        </Flex>
        {description && <Box fontSize="2xl">{description}</Box>}
      </GridItem>
      {content ? <PortableText blocks={content} /> : <Text>No content</Text>}
    </SimpleGrid>
  );
};
