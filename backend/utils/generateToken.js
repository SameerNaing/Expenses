const jwt = require("jsonwebtoken");

/**
 * Returns Access token
 * @param {Object} data - data to encode into JWT token
 * @returns {string}
 */
exports.accessToken = (data) => {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
};

/**
 * Returns Verify token for verify email and reset password
 * @param {Object} data - data to encode into JWT token
 * @returns {string}
 */
exports.verifyToken = (data) => {
  return jwt.sign(data, process.env.VERIFY_TOKEN_SECRET, { expiresIn: "2m" });
};

/**
 * Returns Refresh token
 * @param {Object} data - data to encode into JWT token
 * @returns {string}
 */
exports.refreshToken = (data) => {
  return jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);
};
