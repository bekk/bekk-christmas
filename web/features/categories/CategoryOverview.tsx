import { Category } from "../../pages/category";
import {
  Stack,
  Wrap,
  Container,
  Flex,
  WrapItem,
  Center,
} from "@chakra-ui/react";
import { BackButton } from "../post-list/BackButton";
import { TextLink } from "../design-system/TextLink";
import { getRainbowColor } from "../../utils/color";
import { BekkChristmasLogo } from "../design-system/BekkChristmasLogo";
import { ShapeBackground } from "../shapes/ShapeBackground";

type Props = {
  categories: Category[];
};

export default function CategoryOverview({ categories }: Props) {
  return (
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
      <Flex
        flexDirection="column"
        minHeight="100vh"
        minWidth="100vw"
        padding={["1", "2.5rem"]}
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
    </Center>
  );
  function getCategoryHoverEffect(index) {
    return {
      transform: "scale(1.01)",
      color: "#000",
      backgroundColor: getRainbowColor(categories.length, index + 1),
    };
  }
}
