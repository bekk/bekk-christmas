/** Turns a `yyyy-mm-dd` string into a day and year object */
export const toDayYear = (date: string) => ({
  day: Number(date.split("-")[2]),
  year: Number(date.split("-")[0]),
});
