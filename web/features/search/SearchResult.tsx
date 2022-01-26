import { Center } from "@chakra-ui/react";
import { TextLink } from "../design-system/TextLink";
import { ArticleItemType } from "../post-list/ArticleItem";
import { PodcastItemType } from "../post-list/PodcastItem";
import { VideoItemType } from "../post-list/VideoItem";

type Props = {
  results: (PodcastItemType | VideoItemType | ArticleItemType)[];
};

export default function SearchResult(props: Props) {
  return (
    <Center mt={8} flexDirection="column" aria-label="results">
      <TextLink
        href={`#`}
        fontSize={51}
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
        {"Design and emotion"}
      </TextLink>
      <TextLink
        href={`#`}
        fontSize={51}
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
        {"Implement typography how the design wants it"}
      </TextLink>
      <TextLink
        href={`#`}
        fontSize={51}
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
        {"Why make designsystem?"}
      </TextLink>
      <TextLink
        href={`#`}
        fontSize={51}
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
        {"A Christmas Eve of Design  🤶 "}
      </TextLink>
      <TextLink
        href={`#`}
        fontSize={51}
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
        {"Four defininition of design"}
      </TextLink>
    </Center>
  );
  function getSearchResultHoverEffect() {
    return {
      transform: "scale(1.05)",
      color: "white",
    };
  }
}
