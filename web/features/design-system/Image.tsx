import { chakra } from "@chakra-ui/react";
import NextImage from "next/image";

/** Want to show an image? Use this component
 *
 * This component combines Next's Image component with Chakra to provide the
 * ultimate Image component to rule them all
 */
export const Image = chakra(NextImage, {
  shouldForwardProp: (prop) =>
    [
      "src",
      "sizes",
      "unoptimized",
      "priority",
      "loading",
      "quality",
      "width",
      "height",
      "objectFit",
      "objectPosition",
      "loader",
      "placeholder",
      "blurDataURL",
    ].includes(prop),
});
