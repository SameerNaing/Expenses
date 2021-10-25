const getMatch = require("../utils/getMatchProject");
const dbFunctions = require("../utils/dbFunctions");
const searchFilterConstants = require("../constants/searchFilterConstants");
const LendBorrowModel = require("../models/lendBorrowModel");

exports.getNotDueDataController = async (req, res) => {
  try {
    const { userID, month, year, category, pageNumber } = req.query;

    /** match and project for data aggregation */
    let [match, project] = getMatch({
      userID,
      month:
        month === searchFilterConstants.ALL_MONTHS ? month : parseInt(month),
      year: year === searchFilterConstants.ALL_YEARS ? year : parseInt(year),
      category,
    });

    const dueDataIDs = await dbFunctions.getDueLendBorrowData(userID);

    match = {
      ...match,
      _id: { $nin: dueDataIDs },
    };

    /** matched data IDs  */
    const matchedDataIDs = await dbFunctions.getMatchedDataIDs({
      model: LendBorrowModel,
      project,
      match,
      pageNumber,
    });

    /** Lend borrow formatted data */
    const lendBorrowData = await dbFunctions.getDataFromIDs(
      LendBorrowModel,
      matchedDataIDs,
      "lendBorrowID"
    );

    /** all distinct years for filters */
    const distinctYears = await dbFunctions.getDistinceYears(
      LendBorrowModel,
      userID
    );

    res.json({
      lendBorrowData,
      distinctYears,
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.getDueController = async (req, res) => {
  try {
    const { userID } = req.query;

    /** get all due lendBorrow data ids */
    const dueDataIDs = await dbFunctions.getDueLendBorrowData(userID);

    /** formate all data  */
    const dueLendBorrowData = await dbFunctions.getDataFromIDs(
      LendBorrowModel,
      dueDataIDs,
      "lendBorrowID"
    );

    res.json({
      dueData: dueLendBorrowData,
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.addLendBorrowController = async (req, res) => {
  try {
    const { userID, note, date, dueDate, category, amount } = req.body;

    /** add data to DB*/
    await LendBorrowModel({
      note,
      date,
      dueDate,
      category,
      status: searchFilterConstants.CURRENT_STAT,
      amount,
      userID,
    }).save();

    /** update user balance */
    await dbFunctions.updateUserBalance({
      userID,
      amount,
      category,
      isDelete: false,
    });

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.collectLendBorrowController = async (req, res) => {
  try {
    const { lendBorrowID, userID, category } = req.body;

    /** update status */
    const lendBorrowData = await LendBorrowModel.findByIdAndUpdate(
      lendBorrowID,
      {
        status:
          category === searchFilterConstants.LEND_CAT
            ? searchFilterConstants.DEBT_COLLECTED_STAT
            : searchFilterConstants.DEBT_GIVEN_STAT,
      }
    );

    /** update user balance */
    await dbFunctions.updateUserBalance({
      userID,
      amount: lendBorrowData.amount,
      category:
        category === searchFilterConstants.LEND_CAT
          ? searchFilterConstants.DEBT_COLLECTED_STAT
          : searchFilterConstants.DEBT_GIVEN_STAT,
      isDelete: false,
    });

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.deleteLendBorrowController = async (req, res) => {
  try {
    const { userID, lendBorrowID } = req.query;

    /** delete data  */
    const lendBorrowData = await LendBorrowModel.findByIdAndDelete(
      lendBorrowID
    );

    /** update user balance */
    if (lendBorrowData.status === searchFilterConstants.CURRENT_STAT) {
      await dbFunctions.updateUserBalance({
        userID,
        amount: lendBorrowData.amount,
        category: lendBorrowData.category,
        isDelete: true,
      });
    }

    /** get all available distinct years for filter */
    const distinctYears = await dbFunctions.getDistinceYears(
      LendBorrowModel,
      userID
    );

    res.json({ distinctYears });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};
