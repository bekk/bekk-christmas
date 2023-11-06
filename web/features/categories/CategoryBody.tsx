import { Category } from "../../pages/category";
import { Stack, Wrap, WrapItem } from "@chakra-ui/react";
import { TextLink } from "../design-system/TextLink";
import { getRainbowColor } from "../../utils/color";

type Props = {
  categories: Category[];
};

export const CategoryBody = ({ categories }: Props) => {
  const getCategoryHoverEffect = (index) => {
    return {
      transform: "scale(1.01)",
      color: "#000",
      backgroundColor: getRainbowColor(categories.length, index + 1),
    };
  };
  return (
    <Stack direction="row" mt={4}>
      <Wrap>
        {categories.map((category, index) => (
          <WrapItem key={category.name}>
            <TextLink
              href={`/category/${category.slug}`}
              fontSize={51}
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
  );
};
