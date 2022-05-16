import { Box, Center } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { getClient } from "../../utils/sanity/sanity.server";
import { SiteMetadata } from "../../features/site-metadata/SiteMetadata";
import { CategoryOverview } from "../../features/categories/CategoryOverview";
import { BekkChristmasLogo } from "../../features/design-system/BekkChristmasLogo";
import { ShapeBackground } from "../../features/shapes/ShapeBackground";

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
      <Center
        position="relative"
        flexDirection="column"
        minHeight="100vh"
        overflowX="hidden"
      >
        <BekkChristmasLogo
          position={["relative", "relative", "absolute"]}
          top={["5vmin", "5vmin", "-6vmin"]}
          right={["0vmin", "0vmin", "-6vmin"]}
          width={["30vmin", "24vmin", "20vmin"]}
        />
        <ShapeBackground isFullPage isBlackAndWhite />
        <CategoryOverview categories={categories} />
      </Center>
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
