interface Check {
  data: string;
  onEmpty(): void;
}

/**
 * Check whether data string empty and execute given function when its empty
 * @param checks - A list of input values and functions each to execute when value is empty
 * @return returns true if any data value in given list is empty otherwise false
 * @example
 * const empty = checkEmpty([{data: "address@gmail.com", onEmpty : dispatch()}]);
 */
export default (checks: Check[]): boolean => {
  let emptyData = false;
  for (let c of checks) {
    if (c.data.trim().length === 0) {
      emptyData = true;
      c.onEmpty();
    }
  }
  return emptyData;
};
