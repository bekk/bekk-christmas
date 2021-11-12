import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

type PackageProps = {
  isOpen: boolean;
};
export const Package = (props: PackageProps) => {
  return (
    <Box
      as="svg"
      viewBox="0 0 30 65"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
    >
      <g transform="translate(2.13 42.06)">
        <path d="m1.38.59 23.65.88.62.65L.07 1.1 1.38.59Z" fill="#0B5742" />
        <g transform="translate(3.8 .3)">
          <circle r="9.19" transform="translate(9.2 9.2)" fill="#303030" />
          <path
            d="M8.48 9.76V9.3H6.77V7.59h-.45v1.72H4.59v.45h1.73v1.72h.45V9.76h1.71Zm3.49 2.28V5.25h-.49l-1.23 1.06v.58l1.23-1.08v6.23h.49Z"
            fill="#FFF"
          />
        </g>
        <path
          d="M.15 1.1v18.27c0 .47.38.85.85.85h23.8c.47 0 .85-.38.85-.85V2.07L.15 1.08Z"
          clipRule="evenodd"
          fill="#6D9A8E"
          fillRule="evenodd"
        />
        <path
          d="M11.22 1.51V20.3h3.37l.06-18.65-3.43-.13Z"
          clipRule="evenodd"
          fill="#D78586"
          fillRule="evenodd"
        />
        <rect
          width="25.73"
          height="3.37"
          rx="0"
          ry="0"
          transform="translate(0 8.34)"
          fill="#D78586"
        />
      </g>
      <motion.g
        variants={{
          shaking: {
            y: [-10, -10],
            rotate: [-25, -5],
            transition: { duration: 0.15, repeat: Infinity },
          },
          close: { y: 0, rotate: 0 },
        }}
        animate={props.isOpen ? "shaking" : "close"}
      >
        <path
          d="M8.3 31.7c-4.19-.23-5.1 6.23-3.12 6.34l20.79 1.15c.21.01.46-.86.35-2.4-.18-2.67-2-3.87-3.97-3.98-3.08-.17-4.22 4.51-6.86 4.36-1.58-.08-1.94-.88-2.87-1.92-.94-1.05-1.25-3.38-4.33-3.55Z"
          fill="#C95D5E"
        />
        <path
          d="M6.88 35.15c-2.9-.16-2.41 1.7-1.8 2.66l8.33.8 3.85.2c2.68.08 8.1.19 8.38.03.34-.2.44-1.85-1.52-2.4-1.95-.55-6.41 2.3-6.74 2.27l-3.52-.2c-1.76-.09-3.36-3.16-6.98-3.36Z"
          fill="#BC3436"
        />
        <path
          d="M14.31 36.7c.14.72-.8 1.38-.89 1.74.95.2 3.2.83 3.4.49.24-.43-.1-1.76-.09-2.1.02-.32-2.59-1.02-2.42-.13Z"
          fill="#E4AEAF"
        />
        <path
          d="M1.64 38.14a.43.43 0 0 1 .44-.4l26.31 1.47c.24.01.42.21.4.45l-.3 5.51-27.16-1.5.3-5.53Z"
          fill="#3C7968"
        />
        <path
          d="m13.44 38.37 3.45.19-.1 5.97-3.45-.19.1-5.97Z"
          fill="#D78586"
        />
      </motion.g>
    </Box>
  );
};
