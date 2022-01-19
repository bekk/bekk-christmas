import { Stack, Wrap, Box, Container, Flex, WrapItem } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { TextLink } from "../../features/design-system/TextLink";
import { getClient } from "../../utils/sanity/sanity.server";
import { getRainbowColor } from "../../utils/color";
import { BackButton } from "../../features/post-list/BackButton";
import { transform } from "typescript";

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
                <WrapItem key={category.name}>
                  <TextLink
                    href={`/category/${category.slug}`}
                    fontSize={51}
                    fontFamily="DINOT"
                    lineHeight={1.5}
                    color={getRainbowColor(categories.length, index + 1)}
                    mr={4}
                    transition=".5s ease-out"
                    _hover={getCategoryHoverEffect(index)}
                    _focus={getCategoryHoverEffect(index)}
                  >
                    {category.name}
                  </TextLink>
                </WrapItem>
              ))}
            </Wrap>
          </Stack>
        </Container>
      </Flex>
    </Box>
  );
  function getCategoryHoverEffect(index) {
    return {
      transform: "scale(1.1)",
      color: "#000",
      backgroundColor: getRainbowColor(categories.length, index + 1),
      padding: 1,
    };
  }
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
