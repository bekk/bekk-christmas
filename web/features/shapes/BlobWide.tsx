import { Box } from "@chakra-ui/react";
import { theme } from "../../utils/theme";
import { ShapeProps } from "./Shape";

export const BlobWide = (props: ShapeProps) => {
  return (
    <Box
      as="svg"
      {...props}
      width="750"
      height="750"
      viewBox="0 0 799 609"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M778.627 438.651C819.994 309.472 806.259 102.131 663.152 26.427C554.643 -30.975 427.278 16.675 310.649 60.308C291.602 67.434 -16.4545 185.222 0.689543 303.125C8.65854 357.93 78.8585 357.511 334.96 483.826C528.958 579.51 585.455 627.484 657.075 602.411C734.911 575.162 763.774 485.031 778.627 438.651Z"
        fill={props.shapeColor ?? theme.colors.new.peach}
      />
    </Box>
  );
};
