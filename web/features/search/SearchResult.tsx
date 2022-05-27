import { Center, Text } from "@chakra-ui/react";
import { useSearch } from "../search/SearchContext";
import { TextLink } from "../design-system/TextLink";
import { toDayYear } from "../../utils/date";

export const SearchResult = () => {
  const { isLoading, hasError, searchResults } = useSearch();
  const getSearchResultHoverEffect = () => {
    return {
      transform: "scale(1.05)",
      color: "white",
    };
  };
  return (
    <Center mt={8} flexDirection="column" aria-label="results">
      {!isLoading && hasError && (
        <Text
          fontSize={[32, 32, 51, 51]}
          fontFamily={"DINOT"}
          color="gray"
          textAlign="center"
        >
          {"Woops! Something went wrong :("}
        </Text>
      )}
      {searchResults.length === 0 && !isLoading && !hasError && (
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
        const { year, day } = toDayYear(result.availableFrom);
        const { slug } = result;
        return (
          <TextLink
            key={`${index}-${result.title}`}
            href={`/post/${year}/${day}/${slug.current}`}
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
