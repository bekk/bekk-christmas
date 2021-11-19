import { Box, BoxProps } from "@chakra-ui/react";

export const Squiggle = (props: BoxProps) => {
  return (
    <Box
      as="svg"
      {...props}
      width="650"
      height="1200"
      viewBox="0 0 650 1019"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_647_6233)">
        <path
          d="M216.767 72.5C139.167 138.5 69.362 206.063 72.609 235.073C77.971 282.969 276.501 172.439 295.042 245.141C314.62 321.915 73.618 566.036 85.281 600.508C97.643 637.047 371.124 384.341 392.734 437.388C410.719 481.535 237.312 695.847 257.641 753.507C280.516 818.391 527.592 625.013 539.148 671.577C547.983 707.18 406.605 832.615 413.522 901.96C418.647 953.342 502.837 950.374 577.206 938.569"
          stroke="#DD0026"
          strokeWidth="145"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_647_6233">
          <rect width="649.705" height="1018.27" fill="white" />
        </clipPath>
      </defs>
    </Box>
  );
};
