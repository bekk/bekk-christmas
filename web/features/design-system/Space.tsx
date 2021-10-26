import { Box } from "@chakra-ui/react";

type Storrelse = "medium" | "small";
export type SpaceProps = {
  size?: Storrelse;
  times?: number;
};

export const Space = ({ size = "medium", times = 1 }: SpaceProps) => (
  <Box paddingBottom={pxFor(size) * times + "px"} />
);

const pxFor = (size: Storrelse): number => {
  switch (size) {
    case "medium":
      return 40;
    case "small":
      return 16;
  }
};
