const searchFilterConsts = require("../constants/searchFilterConstants");

/**
 * Returns $match and $project for data aggregation
 * @param {Object} obj
 * @param {string} obj.userID
 * @param {number} obj.month
 * @param {number} obj.year
 * @param {string} obj.status - investment status or lend/borrow status
 * @param {string} obj.category
 * @return {[Map<string, any>]} - [match, project]
 */
module.exports = ({ userID, keyword, month, year, status, category }) => {
  var match = {};
  /** data aggregation must have at least one field */
  var project = { id: 1 };

  if (userID !== undefined) {
    match.userID = userID;
    project.userID = 1;
  }

  if (month !== undefined && month !== searchFilterConsts.ALL_MONTHS) {
    match.month = month + 1; // to match aggregate
    project.month = { $month: "$date" };
  }
  if (year !== undefined && year !== searchFilterConsts.ALL_YEARS) {
    match.year = year;
    project.year = { $year: "$date" };
  }
  if (status !== undefined && status !== searchFilterConsts.ALL_STATUS) {
    match.status = status;
    project.status = 1;
  }
  if (
    category !== undefined &&
    category !== searchFilterConsts.ALL_CATEGORIES
  ) {
    match.category = category;
    project.category = 1;
  }

  return [match, project];
};
