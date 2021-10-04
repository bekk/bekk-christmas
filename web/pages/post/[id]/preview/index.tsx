import { Center, Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import { groq } from "next-sanity";
import { useRouter } from "next/router";
import React from "react";
import { BrokenBalls } from "../../../../features/broken-balls/BrokenBalls";
import { Layout } from "../../../../features/layout/Layout";
import { PostPageTemplate } from "../../../../features/post-page-template/PostPageTemplate";
import { Post } from "../../../../utils/data";
import { usePreviewSubscription } from "../../../../utils/sanity/sanity.client";

export default function BlogPostPreviewPage() {
  const { query } = useRouter();
  const id = (query.id as string)?.replace("draft.", "");
  const {
    data: previewData,
    loading,
    error,
  } = usePreviewSubscription<Post>(
    groq`
  *[_type == "post" && _id == "$id"]
  {..., "authors": authors[].fullName, "tags": tags[]->.name}
  [0]
`,
    { enabled: true, params: { id } }
  );

  if (loading) {
    return (
      <Center minHeight="100vh">
        <Spinner label="Please wait" />
      </Center>
    );
  }

  if (error) {
    return (
      <Layout title="Preview failed" description="">
        <Stack width="80%" maxWidth="380px" textAlign="center" mx="auto">
          <BrokenBalls />
          <Heading as="h2" fontSize="4xl" mt={6}>
            Oh balls…
          </Heading>
          <Text>{error.message}</Text>
        </Stack>
      </Layout>
    );
  }

  if (!previewData) {
    return null;
  }

  const postDataWithFallbacks = {
    authors: previewData.authors?.filter((author) => author) ?? [],
    availableFrom: previewData.availableFrom ?? new Date().toISOString(),
    content: previewData.content ?? [],
    description: previewData.description ?? null,
    id: previewData.id ?? (query.id as string),
    tags: previewData.tags ?? [],
    title: previewData.title ?? "",
    coverImage: previewData.coverImage ?? null,
  };

  return <PostPageTemplate post={postDataWithFallbacks} />;
}
