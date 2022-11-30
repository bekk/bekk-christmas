import {
  BoxProps,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
  Image,
} from "@chakra-ui/react";
import { usePreviewData } from "@opengraphninja/react";
import React from "react";
import { ArrowShort } from "../post-list/Arrow";

const RelatedLink = (
  props: BoxProps & {
    link: { title: string; description: string; url: string };
  }
) => {
  const previewData = usePreviewData(props.link.url);
  if (previewData.status !== "success") {
    return <p>Loading…</p>;
  }

  return (
    <LinkBox
      as="article"
      display="flex"
      alignItems="center"
      padding="1rem"
      borderRadius="1rem"
      background="brand.pink"
      color="brand.darkGreen"
      role="group"
    >
      {previewData.data.image && (
        <Image
          src={previewData.data.image.url}
          alt={previewData.data.image.alt}
          marginRight="40px"
          borderRadius="8px"
          maxHeight={["75px", "75px", "150px", "150px"]}
          objectFit="cover"
        />
      )}
      <Flex flexDirection="column">
        <Heading as="h3" fontSize="22px" fontWeight="normal">
          <LinkOverlay href={props.link.url}>
            {props.link.title ?? previewData.data.title}
          </LinkOverlay>
        </Heading>
        <Text fontSize="16px">
          {props.link.description ?? previewData.data.description}
        </Text>
      </Flex>
      <ArrowShort
        width="2rem"
        flexShrink={0}
        transition="transform 0.1s"
        marginLeft="auto"
        _groupHover={{ transform: "translateX(4px)" }}
      />
    </LinkBox>
  );
};

export default RelatedLink;
