const router = require("express").Router();
const authMiddlewares = require("../middlewares/authMiddlewares");
const authControllers = require("../controllers/authControllers");

router.post(
  "/register",
  authMiddlewares.checkUserExists,
  authControllers.registerController
);
router.post(
  "/verifyRegister",
  authMiddlewares.checkVerifyToken,
  authMiddlewares.checkVerifyingUserExists,
  authMiddlewares.checkVerificationCode,
  authControllers.verifyRegisterController
);

router.post("/login", authControllers.loginController);
router.post("/logout", authControllers.logoutController);

router.post(
  "/forgotPassword",
  authMiddlewares.checkEmailExists,
  authControllers.forgotPasswordController
);
router.post(
  "/verifyForgotPassword",
  authMiddlewares.checkVerifyToken,
  authMiddlewares.checkVerificationCode,
  authControllers.verifyForgotPasswordController
);
router.post(
  "/resetPassword",
  authMiddlewares.checkVerifyToken,
  authControllers.resetPasswordController
);

router.post("/refreshToken", authControllers.refreshToken);

module.exports = router;
