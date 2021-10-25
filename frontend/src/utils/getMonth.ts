import monthsNameList from "../constants/monthsNameList";
import * as filterConstants from "../constants/filterConstants";

/**
 * Returns 0,1,2 according to month if param value not equal to ALL_MONTHS
 * @param month - "Jan", "Apri", etc or ALL_MONTHS
 */
export default (month: string) => {
  return month === filterConstants.ALL_MONTHS
    ? month
    : monthsNameList.findIndex((e) => e === month);
};
