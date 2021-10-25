const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema({
  investmentName: String,
  note: { type: String, default: "" },
  date: Date,
  status: String, // Profited or Lost or Currently invested
  amount: Number,
  profitedAmount: { type: Number, default: 0 },
  userID: String,
});

module.exports = mongoose.model("Investment", investmentSchema);
