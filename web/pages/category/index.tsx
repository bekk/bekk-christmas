import { Stack, Text, Wrap, Box, Container, Flex } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { TextLink } from "../../features/design-system/TextLink";
import { getClient } from "../../utils/sanity/sanity.server";
import { getRainbowColor } from "../../utils/color";
import { BackButton } from "../../features/post-list/BackButton";

type Category = { name: string; slug: string };

export default function CategoryOverviewPage({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <Box>
      <Flex
        flexDirection="column"
        minHeight="100vh"
        background="#000"
        padding="2.5rem"
      >
        <Container maxWidth="container.lg">
          <BackButton color="white" />
          <Stack direction={"row"} mt={4}>
            <Wrap>
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
        </Container>
      </Flex>
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
