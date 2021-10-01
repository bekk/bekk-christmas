import { Center, Spinner } from "@chakra-ui/react";
import { groq } from "next-sanity";
import { useRouter } from "next/router";
import React from "react";
import { PostPageTemplate } from "../../../features/post-page-template/PostPageTemplate";
import { Post } from "../../../utils/data";
import { usePreviewSubscription } from "../../../utils/sanity/sanity.client";

export default function BlogPostPreviewPage() {
  const { query } = useRouter();
  const { data: previewData } = usePreviewSubscription<Post>(
    groq`
  *[_type == "post" && _id == "$id"]
  {..., "authors": authors[].fullName, "tags": tags[]->.name}
  [0]
`,
    { enabled: true, params: { id: query.id as string } }
  );

  if (!previewData) {
    return (
      <Center minHeight="100vh">
        <Spinner />
      </Center>
    );
  }

  const postDataWithFallbacks: Post = {
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
