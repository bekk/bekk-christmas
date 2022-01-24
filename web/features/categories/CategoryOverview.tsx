import { Category } from "../../pages/category";
import {
  Stack,
  Wrap,
  Container,
  Flex,
  WrapItem,
  Center,
  Button,
  Box,
} from "@chakra-ui/react";
import { BackButton } from "../post-list/BackButton";
import { TextLink } from "../design-system/TextLink";
import { getRainbowColor } from "../../utils/color";
import { useEffect, useRef, useState } from "react";
import SearchContainer from "../search/SearchContainer";

type Props = {
  categories: Category[];
};

export default function CategoryOverview({ categories }: Props) {
  const [searchActive, setSearchActive] = useState(false);
  const [searchStr, setSearchStr] = useState<string>("");

  function onSearch() {
    console.log(searchStr);
  }

  function onFocusSearch() {
    console.log("onFocus");
    setSearchActive(true);
  }
  function onSearchBlur() {
    if (searchStr.trim() === "") {
      setSearchActive(false);
    }
    console.log("onBlur");
  }

  useEffect(() => {
    console.log("searchActive: ", searchActive);
  }, [searchActive]);
  return (
    <Flex
      flexDirection="column"
      minHeight="100vh"
      minWidth="100vw"
      padding={"2.5rem"}
    >
      <Container maxWidth="container.lg">
        <Flex flexDirection="row" flexWrap={"wrap"} alignItems={"center"}>
          <BackButton color="white" pr={16} />
          <Box minWidth={"350px"} maxWidth={"500px"} margin={"auto"} my={8}>
            <SearchContainer
              searchStr={searchStr}
              setSearchStr={setSearchStr}
              onEnter={onSearch}
              onFocus={onFocusSearch}
              onBlur={onSearchBlur}
            />
          </Box>
        </Flex>
        <Stack direction={"row"} mt={8}>
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
  );
  function getCategoryHoverEffect(index) {
    return {
      transform: "scale(1.01)",
      color: "#000",
      backgroundColor: getRainbowColor(categories.length, index + 1),
    };
  }
}
