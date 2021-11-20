import { Box } from "@chakra-ui/react";
import { theme } from "../../utils/theme";
import { ShapeProps } from "./Shape";

export const PillarSmall = (props: ShapeProps) => {
  return (
    <Box
      as="svg"
      width="212px"
      viewBox="0 0 212 483"
      fill="new.lightGreen"
      {...props}
    >
      <path d="M17.8183 462.561C39.1653 481.347 74.0213 482.09 96.7633 482.575C112.974 482.921 159.776 483.918 186.827 461.449C240.672 416.724 199.702 292.785 130.12 82.29C111.547 26.104 100.518 -0.542997 87.8683 0.00800332C69.1893 0.822003 63.7443 60.208 34.4963 211.27C2.65527 375.724 -15.6317 433.123 17.8183 462.561Z" />
    </Box>
  );
};
