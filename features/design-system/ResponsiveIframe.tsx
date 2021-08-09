import { AspectRatio, Box } from "@chakra-ui/react";
import React from "react";

export type ResponsiveIframeProps = {
  width?: string | number;
  height?: string | number;
  src?: string;
  allowFullScreen?: boolean;
};
export const ResponsiveIframe = ({
  width,
  height,
  allowFullScreen,
  ...rest
}: ResponsiveIframeProps) => {
  const w = Number(width);
  const h = Number(height);
  const ratio = width && height ? w / h : 4 / 3;
  return (
    <AspectRatio ratio={ratio}>
      <Box as="iframe" width={width} height={height} allowFullScreen={allowFullScreen} {...rest} />
    </AspectRatio>
  );
};
