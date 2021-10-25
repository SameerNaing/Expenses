const limit = require("../constants/paginationLimit");
const searchFilterConst = require("../constants/searchFilterConstants");
const UserModel = require("../models/userModel");
const TransactionModel = require("../models/transactionsModel");
const InvestmentsModel = require("../models/investmentModel");
const LendBorrowModel = require("../models/lendBorrowModel");

/**
 * Returns IDs of matched data
 * @param {Object} obj
 * @param {Object} obj.model - DB Model (TransactionModel, LendBorrowModel, InvestmentModel)
 * @param {Object} obj.project - '$project' for data aggregation
 * @param {Object} obj.match - '$match' for data aggregation
 * @param {number} obj.pageNumber - page number for pagination
 * @returns {Array<string>} - list of sall ids that matched
 */
exports.getMatchedDataIDs = async ({ model, project, match, pageNumber }) => {
  const skip = pageNumber * limit - limit;

  var data = await model.aggregate([
    {
      $project: { ...project, date: 1 },
    },
    { $match: match },
    {
      $facet: {
        data: [
          { $sort: { date: -1, _id: 1 } },
          { $skip: skip },
          { $limit: limit },
        ],
      },
    },
  ]);

  return data[0].data.map((i) => i._id.toString());
};

/**
 * Returns all the distinct years available for given (category or status)
 * @param {Object} mode -DB model
 * @param {string} userID - user id
 * @returns {Array<number>} Array of all available years eg.([2020, 2021])
 */
exports.getDistinceYears = async (model, userID) => {
  var data = await model.aggregate([
    { $project: { userID: 1, date: 1, year: { $year: "$date" } } },
    { $match: { userID } },
    {
      $group: {
        _id: null,
        distinctYears: { $addToSet: "$year" },
      },
    },
  ]);

  if (data.length === 0) {
    return [];
  } else {
    return data[0].distinctYears.sort();
  }
};

/**
 * Return ids of due lend borrow data
 * @param {string} userID
 *
 */
exports.getDueLendBorrowData = async (userID) => {
  const today = new Date();
  const data = await LendBorrowModel.aggregate([
    {
      $project: {
        userID: 1,
        status: 1,
        dateParts: { $dateToParts: { date: "$dueDate" } },
      },
    },
    {
      $match: {
        userID,
        status: searchFilterConst.CURRENT_STAT,
        "dateParts.day": today.getDate(),
        "dateParts.month": today.getMonth() + 1,
        "dateParts.year": today.getFullYear(),
      },
    },
  ]);

  return data.map((d) => d._id);
};

/**
 * Retruns formated data for api of given IDs
 * @param {Object} model DB model
 * @param {Array<string>} ids array of all IDs
 * @param {string} fieldName field name to assign id
 * @return {Array<Map<string, any>>} array of formated data
 */
exports.getDataFromIDs = async (model, ids, fieldName) => {
  var data = [];
  for await (id of ids) {
    var d = await model.findById(id, { _id: 0, __v: 0 });
    data.push({ ...d._doc, [fieldName]: id });
  }
  return data;
};

/**
 * Returns total amount for spent and income from Transactions Data
 * @param {number} month - must not null
 * @param {number} year - must not null
 * @param {number} date - null or value
 * @param {string} userID
 * @returns {[number]} - [totalSpent, totalIncome]
 */
exports.transactionsIncomeSpent = async (month, year, date, userID) => {
  var dateFilter = { "dateParts.day": date };

  var spentCategoryFilter = {
    category: {
      $nin: [searchFilterConst.SALARY, searchFilterConst.OTHER_INCOME],
    },
  };

  var incomeCategoryFilter = {
    $or: [
      { category: searchFilterConst.SALARY },
      { category: searchFilterConst.OTHER_INCOME },
    ],
  };

  var totalSpentAmount = 0;
  var totalIncomeAmount = 0;

  for await (categoryFilter of [spentCategoryFilter, incomeCategoryFilter]) {
    var data = await TransactionModel.aggregate([
      {
        $project: {
          category: 1,
          amount: 1,
          userID: 1,
          dateParts: { $dateToParts: { date: "$date" } },
        },
      },
      {
        $match: {
          "dateParts.month": month + 1, // To match month
          "dateParts.year": year,
          userID,
          ...dateFilter,
          ...categoryFilter,
        },
      },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);

    if (data.length !== 0) {
      categoryFilter === spentCategoryFilter
        ? (totalSpentAmount = data[0].totalAmount)
        : (totalIncomeAmount = data[0].totalAmount);
    }
  }

  return [totalSpentAmount, totalIncomeAmount];
};

/**
 * Returns total amount and profited amount from Investment Data
 * @param {number} month - must not null
 * @param {number} year - must not null
 * @param {number} date - null or value
 * @param {string} userID
 * @returns {Number} - [totalSpentAmount, totalIncomeAmount]
 */
exports.investmentIncomeSpent = async (month, year, date, userID) => {
  var totalSpentAmount = 0;
  var totalIncomeAmount = 0;

  const data = await InvestmentsModel.aggregate([
    {
      $project: {
        status: 1,
        amount: 1,
        profitedAmount: 1,
        userID: 1,
        dateParts: { $dateToParts: { date: "$date" } },
      },
    },
    {
      $match: {
        "dateParts.month": month + 1, // To match month
        "dateParts.year": year,
        "dateParts.day": date,
        userID,
      },
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" },
        totalProfitedAmount: { $sum: "$profitedAmount" },
      },
    },
  ]);

  if (data.length !== 0) {
    totalSpentAmount = data[0].totalAmount;
    totalIncomeAmount = data[0].totalProfitedAmount;
  }

  return [totalSpentAmount, totalIncomeAmount];
};

/**
 * Returns total spent amount (lend) and total income amount (borrow) from LendBorrow Data
 * @param {number} month - must not null
 * @param {number} year - must not null
 * @param {number} date - null or value
 * @param {string} userID
 * @returns {Number} - [totalSpentAmount, totalIncomeAmount]
 */
exports.lendBorrowIncomeSpent = async (month, year, date, userID) => {
  // var dateFilter = day !== null ? { "dateParts.day": date } : {};

  var totalSpentAmount = 0;
  var totalIncomeAmount = 0;

  for await (isSpent of [true, false]) {
    var data = await LendBorrowModel.aggregate([
      {
        $project: {
          category: 1,
          status: 1,
          amount: 1,
          userID: 1,
          dateParts: { $dateToParts: { date: "$date" } },
        },
      },
      {
        $match: {
          "dateParts.month": month + 1, // To match month
          "dateParts.year": year,
          "dateParts.day": date,
          userID,
          $and: [
            {
              $or: [
                { status: searchFilterConst.CURRENT_STAT },
                { status: searchFilterConst.DUE_STAT },
              ],
            },
            {
              category: isSpent
                ? searchFilterConst.LEND_CAT
                : searchFilterConst.BORROW_CAT,
            },
          ],
        },
      },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);

    if (data.length !== 0) {
      isSpent
        ? (totalSpentAmount = data[0].totalAmount)
        : (totalIncomeAmount = data[0].totalAmount);
    }
  }

  return [totalSpentAmount, totalIncomeAmount];
};

/**
 * Update user total balance
 * @param {{userID:string, amount:number, category:string, isDelete:boolean}} params
 */
exports.updateUserBalance = async ({ userID, amount, category, isDelete }) => {
  let { totalBalance } = await UserModel.findById(userID);
  if (
    category === searchFilterConst.SALARY ||
    category === searchFilterConst.OTHER_INCOME ||
    category === searchFilterConst.PROFITED ||
    category === searchFilterConst.BORROW_CAT ||
    category === searchFilterConst.DEBT_COLLECTED_STAT
  ) {
    isDelete ? (totalBalance -= amount) : (totalBalance += amount);
  } else {
    isDelete ? (totalBalance += amount) : (totalBalance -= amount);
  }

  await UserModel.findByIdAndUpdate(userID, { totalBalance });
};
