import { Box, BoxProps } from "@chakra-ui/react";

export const BlobThick = (props: BoxProps) => {
  return (
    <Box
      as="svg"
      width="638px"
      viewBox="0 0 638 543"
      fill="brand.yellow"
      transform="scaleX(-1)"
      {...props}
    >
      <path d="M637.334 357.095C641.542 233.27 586.143 49.444 458.806 8.03899C362.255 -23.355 273.749 43.195 192.705 104.135C179.469 114.088 -34.05 277.333 4.69204 380.127C22.7 427.908 77.06 414.46 302.96 480.319C474.081 530.207 528.255 562.812 578.395 526.937C632.887 487.948 635.823 401.552 637.334 357.095Z" />
    </Box>
  );
};
