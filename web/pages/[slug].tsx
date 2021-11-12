import { GetStaticPaths, GetStaticProps } from "next";
import { groq } from "next-sanity";
import React from "react";
import { Article } from "../features/article/Article";
import { SiteMetadata } from "../features/site-metadata/SiteMetadata";
import { usePreviewSubscription } from "../utils/sanity/sanity.client";
import {
  filterDataToSingleItem,
  getClient,
} from "../utils/sanity/sanity.server";
import { toPlainText } from "../utils/sanity/utils";

type PageProps = {
  query: string;
  queryParams: { slug: string };
  preview: boolean;
  data: {
    slug: string;
    title: string;
    description: unknown[];
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

  const [page] = data;
  return (
    <>
      <SiteMetadata
        title={`${page.title} | Bekk Christmas`}
        description={toPlainText(page.description)}
      />
      <Article
        title={page.title}
        category="Info"
        description={page.description}
        content={page.content}
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
