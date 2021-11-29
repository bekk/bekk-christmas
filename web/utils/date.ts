/** Turns a `yyyy-mm-dd` string into a day and year object */
export const toDayYear = (date: string) => ({
  day: Number(date.split("-")[2]),
  year: Number(date.split("-")[0]),
});

// Turns a date object into "1-Dec" string
export function shortDateFormat(publishedAt: Date): string {
  return (
    publishedAt.toLocaleDateString("en-US", { day: "numeric" }) +
    "-" +
    publishedAt.toLocaleDateString("en-US", { month: "short" })
  );
}
