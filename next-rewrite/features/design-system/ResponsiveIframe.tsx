import { AspectRatio, Box } from "@chakra-ui/react";
import React from "react";

type ResponsiveIframeProps = {
  width?: number;
  height?: number;
  src: string;
  allowFullScreen?: string;
};
export const ResponsiveIframe = ({
  width,
  height,
  allowFullScreen,
  ...rest
}: ResponsiveIframeProps) => {
  const ratio = width && height ? width / height : 4 / 3;
  return (
    <AspectRatio ratio={ratio}>
      <Box
        as="iframe"
        width={width}
        height={height}
        allowFullScreen={allowFullScreen === "true"}
        {...rest}
      />
    </AspectRatio>
  );
};
