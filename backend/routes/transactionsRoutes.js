const router = require("express").Router();
const transactionsControllers = require("../controllers/transactionsControllers");
const authMiddlewares = require("../middlewares/authMiddlewares");

router.get(
  "/",
  authMiddlewares.checkAccessToken,
  transactionsControllers.getTransactionsController
);
router.post(
  "/add",
  authMiddlewares.checkAccessToken,
  transactionsControllers.addTransactionController
);
router.put(
  "/update",
  authMiddlewares.checkAccessToken,
  transactionsControllers.updateTransactionController
);
router.delete(
  "/delete",
  authMiddlewares.checkAccessToken,
  transactionsControllers.deleteTransactionController
);

module.exports = router;
