const router = require("express").Router();
const investmentControllers = require("../controllers/investmentControllers");
const authMiddlewares = require("../middlewares/authMiddlewares");

router.get(
  "/",
  authMiddlewares.checkAccessToken,
  investmentControllers.getInvestmentsController
);
router.post(
  "/add",
  authMiddlewares.checkAccessToken,
  investmentControllers.addInvestmentController
);
router.post(
  "/collect",
  authMiddlewares.checkAccessToken,
  investmentControllers.collectInvestmentController
);
router.put(
  "/update",
  authMiddlewares.checkAccessToken,
  investmentControllers.updateInvestmentController
);
router.delete(
  "/delete",
  authMiddlewares.checkAccessToken,
  investmentControllers.deleteInvestment
);

module.exports = router;
