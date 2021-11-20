import { Box } from "@chakra-ui/react";
import { theme } from "../../utils/theme";
import { ShapeProps } from "./Shape";

export const Star = (props: ShapeProps) => {
  return (
    <Box
      as="svg"
      {...props}
      width="209"
      height="220"
      viewBox="0 0 209 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M73.1484 83.58C101.052 59.822 86.1294 1.14401 94.0394 0.0150081C101.48 -1.04599 102.113 52.662 135.821 73.134C166.624 91.841 207.059 76.318 208.94 83.58C211.181 92.235 149.466 101.317 138.808 136.329C128.159 171.312 174.401 212.74 167.158 219.372C160.943 225.062 133.893 188.964 94.0394 188.035C60.3874 187.251 36.4514 214.565 31.3664 208.926C24.8584 201.715 71.5574 165.419 62.7034 135.807C54.1494 107.211 -1.45964 100.744 0.0293577 94.026C1.43236 87.699 48.2284 104.797 73.1484 83.58Z"
        fill={props.shapeColor ?? theme.colors.new.yellow}
      />
    </Box>
  );
};
