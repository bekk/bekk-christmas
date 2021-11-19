import { Box, BoxProps } from "@chakra-ui/react";

export const PillarSmall = (props: BoxProps) => {
  return (
    <Box
      as="svg"
      {...props}
      width="212"
      height="483"
      viewBox="0 0 212 483"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_647_6246)">
        <path
          d="M17.8183 462.561C39.1653 481.347 74.0213 482.09 96.7633 482.575C112.974 482.921 159.776 483.918 186.827 461.449C240.672 416.724 199.702 292.785 130.12 82.29C111.547 26.104 100.518 -0.542997 87.8683 0.00800332C69.1893 0.822003 63.7443 60.208 34.4963 211.27C2.65527 375.724 -15.6317 433.123 17.8183 462.561Z"
          fill="#007E4E"
        />
      </g>
      <defs>
        <clipPath id="clip0_647_6246">
          <rect width="211.561" height="482.693" fill="white" />
        </clipPath>
      </defs>
    </Box>
  );
};
