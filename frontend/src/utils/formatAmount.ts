import numeral from "numeral";

/**
 * Format number 2000 to 2.0k
 */
export default (amount: number) => {
  return numeral(amount).format("O.Oa");
};
