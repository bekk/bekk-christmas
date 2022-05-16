import { Category } from "../../pages/category";
import { Container, Flex, Text } from "@chakra-ui/react";
import { CategoryBody } from "./CategoryBody";
import { SearchResult } from "../search/SearchResult";
import { CategoryHeader } from "./CategoryHeader";
import { SearchProvider, useSearch } from "../search/SearchContext";

type Props = {
  categories: Category[];
};

const CategoryOverviewContent = ({ categories }: Props) => {
  const { searchIsActive } = useSearch();

  return (
    <Flex
      flexDirection="column"
      minHeight="100vh"
      minWidth="100vw"
      padding="2.5rem"
    >
      <Container maxWidth="container.xl">
        <CategoryHeader />
        {searchIsActive && <SearchResult />}
        {!searchIsActive && (
          <>
            <Text
              color="white"
              fontSize={56}
              fontFamily="DINOT"
              fontWeight="bold"
            >
              Article categories
            </Text>
            <CategoryBody categories={categories} />
          </>
        )}
      </Container>
    </Flex>
  );
};

export const CategoryOverview = ({ categories }: Props) => {
  return (
    <SearchProvider>
      <CategoryOverviewContent categories={categories} />
    </SearchProvider>
  );
};
