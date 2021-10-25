const mongoose = require("mongoose");

const VerifyingUser = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  verificationCode: Number,
});

module.exports = mongoose.model("VerifyingUser", VerifyingUser);
