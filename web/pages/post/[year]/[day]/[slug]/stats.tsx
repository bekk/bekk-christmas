import { Center, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React from "react";
import { SiteMetadata } from "../../../../../features/site-metadata/SiteMetadata";
import { slugify } from "../../../../../utils/slug";
import { supabaseClient } from "../../../../../utils/supabase.client";

type StatsPageProps = {
  viewCount: number;
};
export default function StatsPage({ viewCount }: StatsPageProps) {
  const formatter = new Intl.NumberFormat("en-US");
  return (
    <>
      <SiteMetadata title="Statistics" description="Statistics" />
      <Center height="100vh" backgroundColor="brand.darkGreen" color="white">
        <Text fontSize="3rem">
          {formatter.format(viewCount)} {viewCount === 1 ? "read" : "reads"}
          {viewCount === 0 ? " …yet" : ""}
        </Text>
      </Center>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = slugify(context.resolvedUrl.replace("/stats", ""));
  const { data, error } = await supabaseClient
    .from("pages")
    .select("view_count")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error(error);
    throw error;
  }

  return {
    props: {
      viewCount: data?.view_count || 0,
    },
  };
};
