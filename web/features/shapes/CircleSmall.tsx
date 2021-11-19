import { Box, BoxProps } from "@chakra-ui/react";

export const CircleSmall = (props: BoxProps) => {
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
      <g clipPath="url(#clip0_647_6237)">
        <path
          d="M291.545 583.09C452.561 583.09 583.09 452.561 583.09 291.545C583.09 130.529 452.561 0 291.545 0C130.529 0 0 130.529 0 291.545C0 452.561 130.529 583.09 291.545 583.09Z"
          fill="#FF8278"
        />
      </g>
      <defs>
        <clipPath id="clip0_647_6237">
          <rect width="583.091" height="583.091" fill="white" />
        </clipPath>
      </defs>
    </Box>
  );
};
