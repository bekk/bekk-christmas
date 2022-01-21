export const getRainbowColor = (
  numberOfSteps: number,
  step: number
): string => {
  const hue = Math.floor((360 * step) / numberOfSteps);
  return `hsl(${hue}, 100%, 70%);`;
};
