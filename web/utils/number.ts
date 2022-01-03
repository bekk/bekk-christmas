export const getBoundedNumber = (
  min: number,
  max: number,
  value?: string | string[]
) => {
  const number = Number(value);
  if (Number.isNaN(number)) {
    return 1;
  }
  return Math.max(min, Math.min(max, number));
};
