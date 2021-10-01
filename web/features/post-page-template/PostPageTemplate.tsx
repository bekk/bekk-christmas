import { Box, Container, Heading, Image, Skeleton, Stack, Text } from "@chakra-ui/react";
import React from "react";
import readingTime from "reading-time";
import { Post } from "../../utils/data";
import { toPlainText, urlFor } from "../../utils/sanity/sanity.client";
import { Layout } from "../layout/Layout";
import { PortableText } from "../portable-text/PortableText";

type PostPageTemplateProps = {
  post: Post;
};
export const PostPageTemplate = ({
  post: { title, description, content, authors, coverImage, availableFrom },
}: PostPageTemplateProps) => {
  const imageUrl = getImageUrl(coverImage);
  return (
    <Layout
      title={`${title} - bekk.christmas`}
      description={description}
      image={imageUrl}
      author={authors.join(", ")}
    >
      <Box>
        {imageUrl && (
          <Image
            src={imageUrl}
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
              A {readingTime(toPlainText(content)).text}{" "}
              {authors.length > 0 && (
                <>
                  by
                  <br />
                  <strong>{new Intl.ListFormat("en").format(authors)}</strong>
                </>
              )}
              <br />
              {new Date(availableFrom).toLocaleDateString("nb-NO")}
            </Text>
            {description && (
              <Container maxWidth="container.md" mx="auto" fontSize="2xl" textAlign="center">
                {description}
              </Container>
            )}
          </Box>
          <Box fontSize="lg">
            <PortableText blocks={content} />
          </Box>
        </Stack>
      </Box>
    </Layout>
  );
};

const getImageUrl = (image: any) => {
  if (!image) {
    return null;
  }
  if (typeof image.src === "string") {
    return image.src;
  }
  return urlFor(image).width(1200).url();
};
