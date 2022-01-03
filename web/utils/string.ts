/** Returns the correct separator for a given item in a list */
export const getSeparator = (index: number, list: unknown[]) => {
  const lastItemInList = index === list.length - 1;
  if (lastItemInList) {
    return "";
  }
  const secondToLastItemInList = list.length > 2 && index === list.length - 2;
  if (secondToLastItemInList) {
    return " and ";
  }
  return ", ";
};