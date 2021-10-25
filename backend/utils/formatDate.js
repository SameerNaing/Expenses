/**
 * Format the date for mongodb eg.("2021-07-16")
 * @param {Date} date
 * @returns {string}
 */

module.exports = (date) =>
  date.toISOString().replace(/T.*/, "").split("-").join("-");
