import { Box } from "@chakra-ui/react";
import { theme } from "../../utils/theme";
import { ShapeProps } from "./Shape";

export const CircleSmall = (props: ShapeProps) => {
  return (
    <Box
      as="svg"
      {...props}
      width="800"
      height="800"
      viewBox="0 0 584 584"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M291.545 583.09C452.561 583.09 583.09 452.561 583.09 291.545C583.09 130.529 452.561 0 291.545 0C130.529 0 0 130.529 0 291.545C0 452.561 130.529 583.09 291.545 583.09Z"
        fill={props.shapeColor ?? theme.colors.new.salmon}
      />
    </Box>
  );
};
