import { Flex } from "@chakra-ui/react";
import { BackButton } from "../post-list/BackButton";
import SearchContainer from "../search/SearchContainer";

export default function CategoryHeader() {
  return (
    <Flex flexDirection="row" flexWrap="wrap" alignItems="flex-start" mt={4}>
      <BackButton color="white" mb={8} position={"absolute"} />
      <SearchContainer />
    </Flex>
  );
}
