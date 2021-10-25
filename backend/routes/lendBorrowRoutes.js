const router = require("express").Router();
const lendBorrowControllers = require("../controllers/lendBorrowControllers");
const authMiddlewares = require("../middlewares/authMiddlewares");

router.get(
  "/notDue",
  authMiddlewares.checkAccessToken,
  lendBorrowControllers.getNotDueDataController
);
router.get(
  "/due",
  authMiddlewares.checkAccessToken,
  lendBorrowControllers.getDueController
);
router.post(
  "/add",
  authMiddlewares.checkAccessToken,
  lendBorrowControllers.addLendBorrowController
);
router.post(
  "/collect",
  authMiddlewares.checkAccessToken,
  lendBorrowControllers.collectLendBorrowController
);
router.delete(
  "/delete",
  authMiddlewares.checkAccessToken,
  lendBorrowControllers.deleteLendBorrowController
);

module.exports = router;
