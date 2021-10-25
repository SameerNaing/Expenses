const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const VerifyingUserModel = require("../models/verifyingUserModel");
const UserModel = require("../models/userModel");
const RefreshTokenModel = require("../models/refreshTokenModel");
const sendEmail = require("../utils/sendEmail");
const generateToken = require("../utils/generateToken");
const getVerificationCode = require("../utils/getVerificationCode");

exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    /** Hash user entered password to store in DB */
    const hashPassword = await bcrypt.hash(password, 10);

    /** Get 4-digit number verification code */
    const verificationCode = getVerificationCode();

    /** Get Verify token */
    const verifyToken = generateToken.verifyToken({ email });

    /** Delete previous data if exists */
    await VerifyingUserModel.findOneAndDelete({ email });

    /** Save user data to VerifyingUsers DB */
    const test = await VerifyingUserModel({
      username,
      email,
      password: hashPassword,
      verificationCode,
    }).save();

    /** Send verification code via email */
    await sendEmail(email, verificationCode);

    res.json({ verifyToken });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.verifyRegisterController = async (req, res) => {
  try {
    /** Jwt token encoded data from previous middleware */
    const { email } = req.tokenData;

    /** Get username and password and delete user data from VerifyingUser DB */
    const { username, password } = await VerifyingUserModel.findOneAndDelete({
      email,
    });

    /** Add username, email and password to Users DB */
    const { id } = await UserModel({
      username,
      email,
      password,
    }).save();

    /** Get Access token */
    const accessToken = generateToken.accessToken({ userID: id });
    /** Get Refresk token */
    const refreshToken = generateToken.refreshToken({ userID: id });

    /** Store refresh token to RefreshTokens DB */
    await RefreshTokenModel({
      userID: id,
      refreshTokens: [refreshToken],
    }).save();

    res.json({
      accessToken,
      refreshToken,
      userID: id,
      username,
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    /** Get user data from Users DB */
    const userData = await UserModel.findOne({ email });

    /** if User does not exists in Users DB send 402*/
    if (!userData) return res.sendStatus(402);

    /** Match user entered password with password from DB */
    const passwordMatch = await bcrypt.compare(password, userData.password);

    /** if password incorrect send 401 */
    if (!passwordMatch) return res.sendStatus(401);

    /** Get Access token */
    const accessToken = generateToken.accessToken({ userID: userData.id });
    /** Get Refresk token */
    const refreshToken = generateToken.refreshToken({ userID: userData.id });

    /** Store refresh token to RefreshTokens DB */
    await RefreshTokenModel.findOneAndUpdate(
      { userID: userData.id },
      {
        $push: { refreshTokens: refreshToken },
      }
    );

    /** Delete user data from VerifyingUsers DB if it exists */
    await VerifyingUserModel.findOneAndDelete({ email });

    res.json({
      accessToken,
      refreshToken,
      userID: userData.id,
      username: userData.username,
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.logoutController = async (req, res) => {
  try {
    const { userID, refreshToken } = req.body;

    /** Delete user refresh token from RefreshTokens DB */
    await RefreshTokenModel.findOneAndUpdate(
      { userID },
      {
        $pull: { refreshTokens: refreshToken },
      }
    );

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    /** Get username and password from Users DB */
    const { username, password } = await UserModel.findOne({ email });
    /** Get 4-digit number verification Code */
    const verificationCode = getVerificationCode();
    /** Get Verify Token */
    const verifyToken = generateToken.verifyToken({ email });

    /** delet previous user data from VerifyUser DB if exists */
    await VerifyingUserModel.findOneAndDelete({ email });

    /** Add new user data to VerifyUser DB */
    await VerifyingUserModel({
      username,
      email,
      password,
      verificationCode,
    }).save();

    /** Send verification code via email */
    await sendEmail(email, verificationCode);

    res.json({ verifyToken });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.verifyForgotPasswordController = async (req, res) => {
  try {
    /** JWT encoded data from previous middleware */
    const { email } = req.tokenData;

    /** Delete user data from VerifyUsers DB */
    await VerifyingUserModel.findOneAndDelete({ email });

    /** verify token for password reset */
    const verifyToken = generateToken.verifyToken({ email });

    res.json({ verifyToken });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.resetPasswordController = async (req, res) => {
  try {
    const { newPassword } = req.body;
    /** JWT encoded data from previous middleware */
    const { email } = req.tokenData;
    /** Hash user entered password */
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    /** update user's password in Users DB */
    await UserModel.findOneAndUpdate({ email }, { password: hashedPassword });

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken, userID } = req.body;

    /** Find given refresh token in RefreshTokens DB */
    const storeToken = await RefreshTokenModel.exists({
      userID,
      refreshTokens: { $in: [refreshToken] },
    });

    /** If not found send 402*/
    if (!storeToken) return res.sendStatus(402);

    /** IF found validate the refresh token */
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
      /** Get new accesstoken  */
      const accessToken = generateToken.accessToken({ userID });

      return res.json({ accessToken });
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};
