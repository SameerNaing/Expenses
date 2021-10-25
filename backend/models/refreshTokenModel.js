const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({
  userID: String,
  refreshTokens: [{ type: String }],
});

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);
