import { Flex } from "@chakra-ui/react";
import { BackButton } from "../post-list/BackButton";
import SearchContainer from "../search/SearchContainer";

type Props = {
  searchStr: string;
  setSearchStr: (value: string) => void;
  onEnter: () => void;
  onClose: () => void;
};

export default function CategoryHeader({
  searchStr,
  setSearchStr,
  onEnter,
  onClose,
}: Props) {
  return (
    <Flex flexDirection="row" flexWrap="wrap" alignItems="flex-start" mt={4}>
      <BackButton color="white" mb={8} position={"absolute"} />
      <SearchContainer
        searchStr={searchStr}
        setSearchStr={setSearchStr}
        onEnter={onEnter}
        onClose={onClose}
      />
    </Flex>
  );
}
