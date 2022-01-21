import { Box } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { getClient } from "../../utils/sanity/sanity.server";
import { SiteMetadata } from "../../features/site-metadata/SiteMetadata";
import CategoryOverview from "../../features/categories/CategoryOverview";

export type Category = { name: string; slug: string };

export default function CategoryOverviewPage({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <Box>
      <SiteMetadata
        title="Article categories"
        description="Check out all the article categories accumulated from every Bekk christmas calendar"
      />
      <CategoryOverview categories={categories} />
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const client = getClient();
  const categories = await client.fetch<
    Category[]
  >(`*[_type == "tag"] | order(name asc) {
    name,
    slug,
  }`);
  return {
    props: {
      categories,
    },
  };
};
