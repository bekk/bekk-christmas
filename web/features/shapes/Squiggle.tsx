import { Box, BoxProps, IconProps } from "@chakra-ui/react";

export const Squiggle = (props: BoxProps & IconProps) => {
  return (
    <Box
      as="svg"
      width="650px"
      viewBox="0 0 650 1019"
      stroke={props.fill ?? "brand.red"}
      fill={props.fill ?? "none"}
      strokeWidth="145"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path
        d="M216.767 72.5C139.167 138.5 69.362 206.063 72.609 235.073C77.971 282.969 276.501 172.439 295.042 245.141C314.62 321.915 73.618 566.036 85.281 600.508C97.643 637.047 371.124 384.341 392.734 437.388C410.719 481.535 237.312 695.847 257.641 753.507C280.516 818.391 527.592 625.013 539.148 671.577C547.983 707.18 406.605 832.615 413.522 901.96C418.647 953.342 502.837 950.374 577.206 938.569"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
      />
    </Box>
  );
};
