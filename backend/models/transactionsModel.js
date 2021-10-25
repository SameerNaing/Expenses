const mongoose = require("mongoose");

const transactionsSchema = new mongoose.Schema({
  note: { type: String, default: "" },
  date: Date,
  category: String,
  amount: Number,
  userID: String,
});

module.exports = mongoose.model("Transaction", transactionsSchema);
