const getMatch = require("../utils/getMatchProject");
const dbFunctions = require("../utils/dbFunctions");
const TransactionModel = require("../models/transactionsModel");
const searchFilters = require("../constants/searchFilterConstants");

exports.getTransactionsController = async (req, res) => {
  try {
    const { userID, month, year, category, pageNumber } = req.query;

    /** get match and project object for data aggregation */
    const [match, project] = getMatch({
      userID,
      month: month === searchFilters.ALL_MONTHS ? month : parseInt(month),
      year: year === searchFilters.ALL_YEARS ? year : parseInt(year),
      category,
    });

    /** get data ids from data aggregation */
    const matchedDataIDs = await dbFunctions.getMatchedDataIDs({
      model: TransactionModel,
      project,
      match,
      pageNumber,
    });

    /** get full data info from ids */
    const transactions = await dbFunctions.getDataFromIDs(
      TransactionModel,
      matchedDataIDs,
      "transactionID"
    );

    /** get all available years for filter */
    const distinctYears = await dbFunctions.getDistinceYears(
      TransactionModel,
      userID
    );

    /** send json data to user */
    res.json({
      data: transactions,
      distinctYears,
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.addTransactionController = async (req, res) => {
  try {
    const { userID, note, date, category, amount } = req.body;

    /** create data model and save */
    await TransactionModel({
      userID,
      note,
      date,
      category,
      amount,
    }).save();

    /** update user total balance */
    await dbFunctions.updateUserBalance({
      userID,
      amount,
      category,
      isDelete: false,
    });

    /** send status to user */
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.updateTransactionController = async (req, res) => {
  try {
    const { userID, transactionID, note, date, category, amount } = req.body;

    /** Remove Previous amount from user's total balance */
    const prevTransactionData = await TransactionModel.findById(transactionID);
    await dbFunctions.updateUserBalance({
      userID,
      amount: prevTransactionData.amount,
      category: prevTransactionData.category,
      isDelete: true,
    });

    /** Update and add new amount to user's total balance */
    await TransactionModel.findByIdAndUpdate(transactionID, {
      note,
      date,
      category,
      amount: parseInt(amount),
    });
    await dbFunctions.updateUserBalance({
      userID,
      amount: parseInt(amount),
      category,
      isDelete: false,
    });
    /** get all available years for filter after updating the data */
    const distinctYears = await dbFunctions.getDistinceYears(
      TransactionModel,
      userID
    );

    /** send it to user */
    res.json({ distinctYears });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.deleteTransactionController = async (req, res) => {
  try {
    const { userID, transactionID } = req.query;

    /** delete data from DB */
    const transaction = await TransactionModel.findByIdAndDelete(transactionID);
    /** update user total balance after deleting the data */
    await dbFunctions.updateUserBalance({
      userID,
      amount: transaction.amount,
      category: transaction.category,
      isDelete: true,
    });

    /** get all available years for filter after deleting */
    const distinctYears = await dbFunctions.getDistinceYears(
      TransactionModel,
      userID
    );
    /** send it to user */
    res.json({ distinctYears });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};
