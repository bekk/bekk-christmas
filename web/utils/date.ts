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

export function toISODateString(date: Date) {
  // An ISO string looks like YYYY-MM-DDTHH:MM:SS.SSSZ
  // To get the date part, split the string by capital Ts and take the first item
  return date.toISOString().split("T")[0];
}
