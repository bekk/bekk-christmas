import { GetStaticPaths, GetStaticProps } from "next";
import { groq } from "next-sanity";
import React from "react";
import { Article } from "../features/article/Article";
import { SiteMetadata } from "../features/layout/SiteMetadata";
import { usePreviewSubscription } from "../utils/sanity/sanity.client";
import {
  filterDataToSingleItem,
  getClient,
} from "../utils/sanity/sanity.server";

type PageProps = {
  query: string;
  queryParams: { slug: string };
  preview: boolean;
  data: {
    slug: string;
    title: string;
    description: string;
    content: unknown[];
  };
};
export default function Page({
  data: initialData,
  query,
  queryParams,
  preview,
}: PageProps) {
  const { data } = usePreviewSubscription(query, {
    params: queryParams,
    initialData: [initialData],
    enabled: preview,
  });

  const [post] = data;
  return (
    <>
      <SiteMetadata
        title={`${post.title} | Bekk Christmas`}
        description={post.description}
      />
      <Article
        title={post.title}
        category="Info"
        description={post.description}
        content={post.content}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async ({
  params,
  preview = false,
}) => {
  const slug = params.slug as string;
  const query = groq`*[_type == "page" && slug.current == $slug]`;
  const queryParams = { slug };
  const response = await getClient().fetch(query, queryParams);
  const page = filterDataToSingleItem(response, preview);
  if (!page) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data: page,
      query,
      queryParams,
      preview,
    },
    revalidate: 10,
  };
};

type Page = {
  slug: { current: string };
};
export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getClient().fetch<Page[]>(
    groq`*[_type == 'page'] { slug }`
  );
  return {
    paths: pages.map((page) => `/${page.slug.current}`),
    fallback: "blocking",
  };
};
