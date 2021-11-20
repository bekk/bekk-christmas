import { Box } from "@chakra-ui/react";
import { theme } from "../../utils/theme";
import { ShapeProps } from "./Shape";

export const CircleSmall = (props: ShapeProps) => {
  return (
    <Box
      as="svg"
      width="800px"
      viewBox="0 0 584 584"
      fill="new.salmon"
      {...props}
    >
      <path d="M291.545 583.09C452.561 583.09 583.09 452.561 583.09 291.545C583.09 130.529 452.561 0 291.545 0C130.529 0 0 130.529 0 291.545C0 452.561 130.529 583.09 291.545 583.09Z" />
    </Box>
  );
};
