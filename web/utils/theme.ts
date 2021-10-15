import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: 'Newzald, Georgia, Cambria, "Times New Roman", Times, serif',
    body: "DINOT, 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Geneva, Arial, sans-serif",
    monospace: '"Dank Mono", Menlo, Monaco, "Courier New", Courier, monospace',
  },
  colors: {
    brand: {
      green: "#005941",
      pink: "#FFE0E0",
    },
  },
});
