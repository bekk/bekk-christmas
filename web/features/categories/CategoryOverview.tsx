import { Category } from "../../pages/category";
import { Container, Flex, Text } from "@chakra-ui/react";
import { BackButton } from "../post-list/BackButton";
import { useEffect, useState } from "react";
import SearchContainer from "../search/SearchContainer";
import CategoryBody from "./CategoryBody";
import SearchResult from "../search/SearchResult";
import CategoryHeader from "./CategoryHeader";

type Props = {
  categories: Category[];
};

export default function CategoryOverview({ categories }: Props) {
  const [searchStr, setSearchStr] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchIsActive, setSearchIsActive] = useState<boolean>(false);

  function onSearch() {
    setSearchIsActive(true);
    console.log(searchStr);
  }

  function onSearchClose() {
    setSearchIsActive(false);
    setSearchStr("");
  }

  useEffect(() => {
    console.log("searchActive: ", searchIsActive);
  }, [searchIsActive]);

  return (
    <Flex
      flexDirection="column"
      minHeight="100vh"
      minWidth="100vw"
      padding="2.5rem"
    >
      <Container maxWidth="container.lg">
        <CategoryHeader
          searchStr={searchStr}
          setSearchStr={setSearchStr}
          onEnter={onSearch}
          onClose={onSearchClose}
        />
        {loading && <Text color="white">Loading...</Text>}
        {searchIsActive && !loading && <SearchResult results={[]} />}
        {!searchIsActive && !loading && (
          <CategoryBody categories={categories} />
        )}
      </Container>
    </Flex>
  );
}
