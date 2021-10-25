const dbFunctions = require("../utils/dbFunctions");
const getPrevDates = require("../utils/getPeriousDate");
const searchFilterConsts = require("../constants/searchFilterConstants");
const TransactionsModel = require("../models/transactionsModel");
const UserModel = require("../models/userModel");

exports.getPrevDatesSpentIncomeController = async (req, res) => {
  try {
    const { userID } = req.query;

    /** get previous 4 days date */
    const prevDates = getPrevDates();
    /** array to store formatted return data */
    const dataToReturn = [];

    /** loop all previous 4 days */
    for await (d of prevDates) {
      /** get total income and spent from transactions */
      const [transactionSpent, transactionIncome] =
        await dbFunctions.transactionsIncomeSpent(
          d.getMonth(),
          d.getFullYear(),
          d.getDate(),
          userID
        );
      /** get total income and spent from investments */
      const [investmentSpent, investmentIncome] =
        await dbFunctions.investmentIncomeSpent(
          d.getMonth(),
          d.getFullYear(),
          d.getDate(),
          userID
        );
      /** get total income and spent from lendBorrow */
      const [lendBorrowSpent, lendBorrowIncome] =
        await dbFunctions.lendBorrowIncomeSpent(
          d.getMonth(),
          d.getFullYear(),
          d.getDate(),
          userID
        );

      /** sum all spent amount and income from all DB */
      totalSpent = transactionSpent + investmentSpent + lendBorrowSpent;
      totalIncome = transactionIncome + investmentIncome + lendBorrowIncome;

      /** push to array */
      dataToReturn.push({
        day: `Day ${d.getDate()}`,
        spent: totalSpent,
        income: totalIncome,
      });
    }

    res.json(dataToReturn.reverse());
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.getTodaySpendIncomeController = async (req, res) => {
  try {
    const { userID } = req.query;

    /** get today date */
    const todayDate = new Date();

    /** get spent and income amount from transactions DB */
    const [transactionSpent, transactionIncome] =
      await dbFunctions.transactionsIncomeSpent(
        todayDate.getMonth(),
        todayDate.getFullYear(),
        todayDate.getDate(),
        userID
      );

    /** get spend and income amount from investment DB */
    const [investmentSpent, investmentIncome] =
      await dbFunctions.investmentIncomeSpent(
        todayDate.getMonth(),
        todayDate.getFullYear(),
        todayDate.getDate(),
        userID
      );

    /** get spend and income amount from lendBorrow DB */
    const [lendBorrowSpent, lendBorrowIncome] =
      await dbFunctions.lendBorrowIncomeSpent(
        todayDate.getMonth(),
        todayDate.getFullYear(),
        todayDate.getDate(),
        userID
      );

    /** sum all income and spent amount from all DB  */
    totalSpent = transactionSpent + investmentSpent + lendBorrowSpent;
    totalIncome = transactionIncome + investmentIncome + lendBorrowIncome;

    res.json({ totalSpent, totalIncome });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.getBiggestExpenseCategoryController = async (req, res) => {
  try {
    const { userID } = req.query;

    /** aggregate data and get transactions category of biggest expense */
    const data = await TransactionsModel.aggregate([
      {
        $project: {
          category: 1,
          amount: 1,
          userID: 1,
        },
      },
      {
        $match: {
          userID,
          category: {
            $nin: [searchFilterConsts.SALARY, searchFilterConsts.OTHER_INCOME],
          },
        },
      },
      { $group: { _id: "$category", spentAmount: { $sum: "$amount" } } },
      { $sort: { spentAmount: -1 } },
    ]);

    /** format the data*/
    const formattedData = data.map((d) => {
      return { categoryName: d._id, amount: d.spentAmount };
    });

    res.json(formattedData);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.getTotalBalance = async (req, res) => {
  try {
    const { userID } = req.query;

    /** get user total balance */
    const totalBalance = await UserModel.findById(userID, {
      totalBalance: 1,
      _id: 0,
    });

    res.json(totalBalance);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};
