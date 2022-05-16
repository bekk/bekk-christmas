import { Center, Text } from "@chakra-ui/react";
import { useSearch } from "../search/SearchContext";
import { TextLink } from "../design-system/TextLink";

export const SearchResult = () => {
  const { loading, searchResults } = useSearch();
  const getSearchResultHoverEffect = () => {
    return {
      transform: "scale(1.05)",
      color: "white",
    };
  };
  return (
    <Center mt={8} flexDirection="column" aria-label="results">
      {searchResults.length === 0 && !loading && (
        <Text
          fontSize={[32, 32, 51, 51]}
          fontFamily={"DINOT"}
          color="gray"
          textAlign="center"
        >
          Sorry, no results
        </Text>
      )}
      {searchResults.map((result, index) => {
        return (
          <TextLink
            key={`${index}-${result.title}`}
            href={`#`}
            fontSize={[32, 32, 51, 51]}
            fontFamily="Newzald"
            lineHeight={1.5}
            color="grey"
            textAlign="center"
            transition=".25s ease-out"
            _hover={getSearchResultHoverEffect()}
            _focus={getSearchResultHoverEffect()}
            textDecoration={"none"}
            my={2}
          >
            {result.title}
          </TextLink>
        );
      })}
    </Center>
  );
};
