import { Image } from "@chakra-ui/image";
import { Text } from "@chakra-ui/layout";
import { Stack } from "@chakra-ui/react";
import * as React from "react";
import { urlFor } from "../../../utils/sanity/utils";

export const ImageBlock = ({ node }: any) => {
  if (!node?.asset) {
    return null;
  }

  return (
    <Stack as="figure">
      <Image
        src={urlFor(node.asset).width(800).url()!}
        srcSet={`${urlFor(node.asset).width(400).url()!} 400w, ${urlFor(node.asset).width(800).url()!} 800w, ${urlFor(node.asset).width(1200).url()!} 1200w, ${urlFor(node.asset).width(1600).url()!} 1600w`}
        sizes="(max-width: 920px) 100vw, 920px"
        alt={node.alt}
        borderRadius={20}
      />
      {node.caption && (
        <Text as="figcaption" color="gray.500" textAlign="center">
          {node.caption}
        </Text>
      )}
    </Stack>
  );
};
