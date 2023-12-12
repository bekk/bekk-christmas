import { extendTheme } from "@chakra-ui/react";
import localFont from "next/font/local";

export const gtAmericaStandard = localFont({
  src: [
    {
      path: "fonts/GT-America-Standard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
});

export const gtAmericaExpanded = localFont({
  src: [
    {
      path: "fonts/GT-America-Expanded-Medium.woff2",
      weight: "500",
    },
  ],
});

export const theme = extendTheme({
  fonts: {
    heading: `${gtAmericaStandard.style.fontFamily}, Arial, sans-serif`,
    body: `${gtAmericaStandard.style.fontFamily}, Arial, sans-serif`,
    monospace: '"Dank Mono", Menlo, Monaco, "Courier New", Courier, monospace',
  },
  colors: {
    brand: {
      darkGreen: "#0B5742",
      lightGreen: "#007E4E",
      yellow: "#FFF19F",
      salmon: "#FF8278",
      peach: "#F89B90",
      red: "#DD0026",
      pink: "#F7DEDF",
      white: "#FFFFFF",
      black: "#0E0E0E",
      gray: "#646464",
    },
    green: {
      50: "#03152E",
      100: "#042639",
      200: "#063A43",
      300: "#094D49",
      400: "#0B5742",
      500: "#2A6F4F",
      600: "#4A865F",
      700: "#6A9D73",
      800: "#8CB38B",
      900: "#B2C9AC",
    },
  },
});
