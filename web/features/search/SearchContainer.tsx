import { Flex, Box } from "@chakra-ui/react";
import { TextLink } from "../design-system/TextLink";
import SearchInput from "./SearchInput";

type Props = {
  searchStr: string;
  setSearchStr: (value: string) => void;
  onEnter: () => void;
  onClose: () => void;
};

export default function SearchContainer({
  searchStr,
  setSearchStr,
  onEnter,
  onClose,
}: Props) {
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
          onClose={() => onClose()}
          value={searchStr}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onEnter();
            }
          }}
        />
      </Box>
      <Box height={"16px"} ml={-2}>
        {searchStr.trim().length > 0 && (
          <TextLink color="white" href={"#"}>
            Show all results for "{searchStr}"
          </TextLink>
        )}
      </Box>
    </Flex>
  );
}
