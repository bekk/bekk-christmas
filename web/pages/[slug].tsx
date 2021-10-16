import { GetStaticPaths, GetStaticProps } from "next";
import { groq } from "next-sanity";
import React from "react";
import { Article } from "../features/article/Article";
import { SiteMetadata } from "../features/layout/SiteMetadata";
import { getClient } from "../utils/sanity/sanity.server";

type PageProps = {
  title: string;
  description: string;
  content: unknown[];
};
export default function Page({ title, description, content }: PageProps) {
  return (
    <>
      <SiteMetadata
        title={`${title} | Bekk Christmas`}
        description={description}
      />
      <Article
        title={title}
        category="Info"
        description={description}
        content={content}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const slug = params.slug as string;
  const page = await getClient().fetch(
    groq`*[_type == "page" && slug.current == $slug][0]`,
    { slug }
  );
  if (!page) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      ...page,
    },
  };
};

type Page = {
  slug: string;
};
export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getClient().fetch<Page[]>(
    groq`*[_type == 'page'] { slug }`
  );
  return {
    paths: pages.map((page) => `/${page.slug}`),
    fallback: false,
  };
};
