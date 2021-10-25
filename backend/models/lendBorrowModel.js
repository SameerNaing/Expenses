const mongoose = require("mongoose");

const lendBorrowSchema = new mongoose.Schema({
  note: { type: String, default: "" },
  /** Lended or Borrowed Date */
  date: Date,
  /** Data due date */
  dueDate: Date,
  /** Lend or Borrow  */
  category: String,
  /**Currently lend/borrow or debt collected or debt given */
  status: String,
  /** amount */
  amount: Number,
  /** userID */
  userID: String,
});

module.exports = mongoose.model("LendBorrow", lendBorrowSchema);
