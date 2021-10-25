import monthsNameList from "../constants/monthsNameList";

/** Format Date to 2, Nov, 2000 */
export const formatDisplay = (date: string) => {
  const d = new Date(date);

  return `${d.getDate()}, ${monthsNameList[d.getMonth()]}, ${d.getFullYear()}`;
};

/** Format Date to 2000-11-02 */
export const formatInputValue = (date: string) => {
  const d = new Date(date);
  return d.toISOString().replace(/T.*/, "").split("-").join("-");
};
