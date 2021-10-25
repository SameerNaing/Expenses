const route = require("express").Router();
const overviewControllers = require("../controllers/overviewControllers");
const authMiddlewares = require("../middlewares/authMiddlewares");

route.get(
  "/totalBalance",
  authMiddlewares.checkAccessToken,
  overviewControllers.getTotalBalance
);
route.get(
  "/prevDatesSpentIncome",
  authMiddlewares.checkAccessToken,
  overviewControllers.getPrevDatesSpentIncomeController
);
route.get(
  "/todaySpentIncome",
  authMiddlewares.checkAccessToken,
  overviewControllers.getTodaySpendIncomeController
);
route.get(
  "/biggestExpenseCategory",
  authMiddlewares.checkAccessToken,
  overviewControllers.getBiggestExpenseCategoryController
);

module.exports = route;
