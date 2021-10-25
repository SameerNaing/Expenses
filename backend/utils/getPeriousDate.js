/**
 * Returns previous 4 days
 * @returns {[number]}
 */
module.exports = () => {
  const prevsDate = [];
  for (i = 1; i <= 4; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    prevsDate.push(date);
  }
  return prevsDate;
};
