const getMatch = require("../utils/getMatchProject");
const dbFunctions = require("../utils/dbFunctions");
const InvestmentModel = require("../models/investmentModel");
const searchFilters = require("../constants/searchFilterConstants");

exports.getInvestmentsController = async (req, res) => {
  try {
    const { userID, month, year, status, pageNumber } = req.query;

    /** get match and project object for data aggregation */
    const [match, project] = getMatch({
      userID,
      month: month === searchFilters.ALL_MONTHS ? month : parseInt(month),
      year: year === searchFilters.ALL_YEARS ? year : parseInt(year),
      status,
    });

    /** get ids from data aggregation */
    const matchedDataIDs = await dbFunctions.getMatchedDataIDs({
      model: InvestmentModel,
      project,
      match,
      pageNumber,
    });

    /** format data */
    const investments = await dbFunctions.getDataFromIDs(
      InvestmentModel,
      matchedDataIDs,
      "investmentID"
    );

    /** get all available years for filter */
    const distinctYears = await dbFunctions.getDistinceYears(
      InvestmentModel,
      userID
    );

    res.json({
      data: investments,
      distinctYears,
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.collectInvestmentController = async (req, res) => {
  try {
    const { userID, investmentID, isProfit, profitAmount } = req.body;

    if (isProfit) {
      await dbFunctions.updateUserBalance({
        userID,
        amount: profitAmount,
        category: searchFilters.PROFITED,
        isDelete: false,
      });

      await InvestmentModel.findByIdAndUpdate(investmentID, {
        status: searchFilters.PROFITED,
        profitedAmount: profitAmount,
      });
    } else {
      await InvestmentModel.findByIdAndUpdate(investmentID, {
        status: searchFilters.LOST,
      });
    }

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.addInvestmentController = async (req, res) => {
  try {
    const { userID, investmentName, note, date, amount } = req.body;

    await InvestmentModel({
      investmentName,
      note,
      date,
      status: searchFilters.CURRENTLY_INVESTED,
      amount,
      userID,
    }).save();

    await dbFunctions.updateUserBalance({
      userID,
      amount,
      category: searchFilters.CURRENTLY_INVESTED,
      isDelete: false,
    });

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.updateInvestmentController = async (req, res) => {
  try {
    const {
      userID,
      investmentID,
      investmentName,
      note,
      date,
      amount,
      status,
      profitedAmount,
    } = req.body;

    const prevData = await InvestmentModel.findById(investmentID);

    /** Remove previous Data amount from User's total balance */
    await dbFunctions.updateUserBalance({
      userID,
      amount: prevData.amount,
      category: searchFilters.CURRENTLY_INVESTED,
      isDelete: true,
    });
    if (prevData.status === searchFilters.PROFITED) {
      await dbFunctions.updateUserBalance({
        userID,
        amount: prevData.profitedAmount,
        category: prevData.status,
        isDelete: true,
      });
    }

    /** Update UserBalance and Investment Data by adding investment amount */
    await dbFunctions.updateUserBalance({
      userID,
      amount: parseInt(amount),
      category: searchFilters.CURRENTLY_INVESTED,
      isDelete: false,
    });
    await InvestmentModel.findByIdAndUpdate(investmentID, {
      investmentName,
      note,
      date,
      amount: parseInt(amount),
      status,
    });

    /** if user edit data status is profited then update user balance and investment data by adding profited amount */
    if (status === searchFilters.PROFITED) {
      await dbFunctions.updateUserBalance({
        userID,
        amount: parseInt(profitedAmount),
        category: status,
        isDelete: false,
      });
      await InvestmentModel.findByIdAndUpdate(investmentID, {
        profitedAmount: parseInt(profitedAmount),
      });
    }

    const distinctYears = await dbFunctions.getDistinceYears(
      InvestmentModel,
      userID
    );

    res.json({ distinctYears });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.deleteInvestment = async (req, res) => {
  try {
    const { userID, investmentID } = req.query;
    const investment = await InvestmentModel.findByIdAndDelete(investmentID);
    await dbFunctions.updateUserBalance({
      userID,
      amount: investment.amount,
      category: searchFilters.CURRENTLY_INVESTED,
      isDelete: true,
    });

    if (investment.status === searchFilters.PROFITED) {
      await dbFunctions.updateUserBalance({
        userID,
        amount: investment.profitedAmount,
        category: investment.status,
        isDelete: true,
      });
    }

    const distinctYears = await dbFunctions.getDistinceYears(
      InvestmentModel,
      userID
    );

    res.json({ distinctYears });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};
