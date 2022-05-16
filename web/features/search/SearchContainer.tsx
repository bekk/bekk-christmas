import { Flex, Box } from "@chakra-ui/react";
import { TextLink } from "../design-system/TextLink";
import SearchInput from "./SearchInput";
import { useSearch } from "./SearchContext";
import { useEffect } from "react";

export default function SearchContainer() {
  const { searchStr, setSearchStr, onSearchClose, onSearch, searchIsActive } =
    useSearch();

  useEffect(() => {
    console.log(searchStr);
  }, [searchStr]);
  return (
    <Flex
      flexDirection="column"
      mx="auto"
      mt={[16, 16, 0, 0]}
      mb={[4, 4, 0, 0]}
    >
      <Box minWidth="400px" mb={4}>
        <SearchInput
          onChange={(e) => setSearchStr(e.target.value)}
          onClose={() => onSearchClose()}
          value={searchStr}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onSearch();
            }
          }}
        />
      </Box>
      <Box height={"16px"} ml={-2}>
        {!searchIsActive && searchStr && searchStr.trim().length > 0 && (
          <TextLink color="white" onClick={onSearch} href={"#"}>
            Show all results for "{searchStr}"
          </TextLink>
        )}
      </Box>
    </Flex>
  );
}
