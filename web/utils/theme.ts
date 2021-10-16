import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: 'Newzald, Georgia, Cambria, "Times New Roman", Times, serif',
    body: "DINOT, 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Geneva, Arial, sans-serif",
    monospace: '"Dank Mono", Menlo, Monaco, "Courier New", Courier, monospace',
  },
  colors: {
    brand: {
      darkGreen: "#005941",
      darkGreenTransparent: "00594180",
      pink: "#FFE0E0",
      lightPink: "#F7DEDF",
      lightGreen: "#E3F0E5",
      red: "#BC3436",
      peach: "#EAA196",
      midGreen: "#447A67",
      midGreenTransparent: "#447A6766",
    },
  },
});

const brandColors = theme.colors.brand;
export const colorCombinations = [
  {
    background: brandColors.midGreen,
    foreground: brandColors.lightPink,
  },
  {
    background: brandColors.lightPink,
    foreground: brandColors.midGreen,
  },
  {
    background: brandColors.lightGreen,
    foreground: brandColors.midGreenTransparent,
  },
  {
    background: brandColors.red,
    foreground: brandColors.lightPink,
  },
  {
    background: brandColors.peach,
    foreground: brandColors.midGreen,
  },
  {
    background: brandColors.lightGreen,
    foreground: brandColors.midGreen,
  },
];
