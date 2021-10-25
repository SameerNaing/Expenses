/**
 * Returns 4-digit number for verification code
 * @returns {number}
 */
module.exports = () => Math.floor(1000 + Math.random() * 9000);
