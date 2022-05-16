import { Center, Text } from "@chakra-ui/react";
import { SearchResultType } from "../search/SearchContext";
import { TextLink } from "../design-system/TextLink";

type Props = {
  results: SearchResultType[];
};

export default function SearchResult({ results }: Props) {
  return (
    <Center mt={8} flexDirection="column" aria-label="results">
      {results.length === 0 && (
        <Text
          fontSize={[32, 32, 51, 51]}
          fontFamily={"DINOT"}
          color="gray"
          textAlign="center"
        >
          Sorry, no results
        </Text>
      )}
      {results.map((result, index) => {
        return (
          <>
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
          </>
        );
      })}
    </Center>
  );
  function getSearchResultHoverEffect() {
    return {
      transform: "scale(1.05)",
      color: "white",
    };
  }
}
