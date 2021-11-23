import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: 'Newzald, Georgia, Cambria, "Times New Roman", Times, serif',
    body: "DINOT, 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Geneva, Arial, sans-serif",
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
  },
});
