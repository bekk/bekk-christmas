import { Stack, Text, Wrap } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { TextLink } from "../../features/design-system/TextLink";
import { getClient } from "../../utils/sanity/sanity.server";
import { getRainbowColor } from "../../utils/color";

type Category = { name: string; slug: string };

export default function CategoryOverviewPage({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <Stack direction={"row"} bgColor="#000" height={"100vh"} overflow={"auto"}>
      <Wrap m={[8, 8, 24, 24]}>
        {categories.map((category, index) => (
          <Text
            key={category.name}
            fontSize={51}
            fontFamily="DINOT"
            lineHeight={1.5}
            color={getRainbowColor(categories.length, index + 1)}
            pr={4}
          >
            <TextLink href={`/category/${category.slug}`}>
              {category.name}
            </TextLink>
          </Text>
        ))}
      </Wrap>
    </Stack>
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
