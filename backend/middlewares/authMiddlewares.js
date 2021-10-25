const jwt = require("jsonwebtoken");

const VerifyingUserModel = require("../models/verifyingUserModel");
const UserModel = require("../models/userModel");

/**
 * Checks whether register user already have an account with their email
 */
exports.checkUserExists = async (req, res, next) => {
  try {
    const { email } = req.body;
    const isExists = await UserModel.exists({ email });

    if (isExists) {
      return res.sendStatus(403);
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

/**
 * Checks whether user email exists to reset password
 */
exports.checkEmailExists = async (req, res, next) => {
  try {
    const { email } = req.body;
    const isExists = await UserModel.exists({ email });

    if (isExists) {
      next();
    } else {
      return res.sendStatus(404);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

/**
 * Validate "verify-token"
 */
exports.checkVerifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const verifyToken = authHeader && authHeader.split(" ")[1];

    if (verifyToken === null) return res.sendStatus(404);

    jwt.verify(verifyToken, process.env.VERIFY_TOKEN_SECRET, (err, data) => {
      if (err) return res.sendStatus(403);

      /** Store jwt encoded data and pass to other middlewares and controller*/
      req.tokenData = data;

      next();
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

/**
 * Check is verifying user exists in VerifyingUser Database
 */
exports.checkVerifyingUserExists = async (req, res, next) => {
  /** jwt encoded data from previous middleware */
  const { email } = req.tokenData;

  const isExists = await VerifyingUserModel.exists({ email });

  if (!isExists) {
    return res.sendStatus(402);
  } else {
    next();
  }
};

/**
 * Checks verification code correct
 */
exports.checkVerificationCode = async (req, res, next) => {
  const { verificationCode } = req.body;
  const { email } = req.tokenData;
  const verifyingUser = await VerifyingUserModel.findOne({
    email,
    verificationCode,
  });

  if (!verifyingUser) {
    return res.sendStatus(406);
  } else {
    next();
  }
};

exports.checkAccessToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader && authHeader.split(" ")[1];

    if (accessToken === null) return res.sendStatus(401);

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      if (err) {
        return res.sendStatus(401);
      } // for axios to send refreshToken if statusCode = 401
      next();
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};
