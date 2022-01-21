export const getRainbowColor = (
  numberOfSteps: number,
  step: number
): string => {
  const hue = Math.floor((360 * step) / numberOfSteps);
  return `hsl(${hue}, 100%, 70%);`;
};

export const getGreyNote = (numberOfSteps: number, step: number): string => {
  const lightness = Math.floor((25 * step) / numberOfSteps);
  return `hsl(0, 1%, ${lightness}%);`;
};
