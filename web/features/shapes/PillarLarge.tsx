import { Box } from "@chakra-ui/react";
import { theme } from "../../utils/theme";
import { ShapeProps } from "./Shape";

export const PillarLarge = (props: ShapeProps) => {
  return (
    <Box
      as="svg"
      {...props}
      width="381"
      height="869"
      viewBox="0 0 381 869"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32.0492 832.015C70.4462 865.807 133.142 867.143 174.049 868.015C203.209 868.637 287.391 870.431 336.049 830.015C432.901 749.568 359.208 526.637 234.049 148.015C200.642 46.954 180.802 -0.977041 158.049 0.0149595C124.451 1.47896 114.658 108.296 62.0492 380.015C4.77624 675.822 -28.1168 779.065 32.0492 832.015Z"
        fill={props.shapeColor ?? theme.colors.new.darkGreen}
      />
    </Box>
  );
};
