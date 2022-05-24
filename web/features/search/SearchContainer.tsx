import { Flex, Box } from "@chakra-ui/react";
import { SearchInput } from "./SearchInput";
import { useSearch } from "./SearchContext";

export const SearchContainer = () => {
  const { query, setQuery, onClose } = useSearch();

  return (
    <Flex
      flexDirection="column"
      mx="auto"
      mt={[16, 16, 0, 0]}
      mb={[4, 4, 0, 0]}
    >
      <Box minWidth="400px" mb={4}>
        <SearchInput
          onChange={(e) => setQuery(e.target.value)}
          onClose={onClose}
          value={query}
        />
      </Box>
    </Flex>
  );
};
