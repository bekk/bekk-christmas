import { Category } from "../../pages/category";
import { Center, Container, Flex, Text } from "@chakra-ui/react";
import CategoryBody from "./CategoryBody";
import SearchResult from "../search/SearchResult";
import CategoryHeader from "./CategoryHeader";
import { SearchProvider, useSearch } from "../search/SearchContext";

type Props = {
  categories: Category[];
};

function CategoryOverviewContent({ categories }: Props) {
  const { loading, searchIsActive, searchResults } = useSearch();
  return (
    <Flex
      flexDirection="column"
      minHeight="100vh"
      minWidth="100vw"
      padding="2.5rem"
    >
      <Container maxWidth="container.xl">
        <CategoryHeader />
        {loading && (
          <Center mt={8}>
            <Text color="white" fontSize={31}>
              Loading...
            </Text>
          </Center>
        )}
        {searchIsActive && !loading && <SearchResult results={searchResults} />}
        {!searchIsActive && !loading && (
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
}

export default function CategoryOverview({ categories }: Props) {
  return (
    <SearchProvider>
      <CategoryOverviewContent categories={categories} />
    </SearchProvider>
  );
}
