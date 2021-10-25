import axios from "axios";

import api from "../../utils/api";
import { VERIFY_TOKEN } from "../../constants/localStorageKeys";
import { codeError, setStatus } from "./verifyEmail-slice";
import UserModel from "../../models/userModel";
import { showSnackBar } from "../snackbar/snackbar-slice";
import { Status } from "../../constants/status";
import { showPage } from "../resetPassword/resetPassword-slice";

/** Verify code for register user */
const verifyRegisterAction =
  (verificationCode: string) => async (dispatch: Function) => {
    if (verificationCode.trim().length === 0) {
      return dispatch(codeError("Enter verification code"));
    }

    dispatch(setStatus(Status.Loading));

    try {
      const response = await api.verifyRegister({
        verificationCode,
      });
      const { userID, username, accessToken, refreshToken } = response.data;
      const userData: UserModel = new UserModel(
        userID,
        username,
        accessToken,
        refreshToken
      );

      userData.save();

      localStorage.removeItem(VERIFY_TOKEN);

      dispatch(setStatus(Status.Loaded));
    } catch (e) {
      if (axios.isAxiosError(e)) {
        switch (e.response!.status) {
          case 406:
            dispatch(codeError("Incorrect code"));
            break;
          case 403:
            dispatch(
              showSnackBar({ isError: true, message: "Verification Timeout" })
            );
            break;
          default:
            dispatch(
              showSnackBar({ isError: true, message: "Unable to verify" })
            );
            break;
        }
      }
      dispatch(setStatus(Status.Error));
    }
  };

/** verify code for forgot password */
const verifyForgotPasswordAction =
  (verificationCode: string) => async (dispatch: Function) => {
    if (verificationCode.trim().length === 0) {
      return dispatch(codeError("Enter verification code"));
    }
    dispatch(setStatus(Status.Loading));

    try {
      const response = await api.verifyForgotPassword({ verificationCode });
      localStorage.setItem(VERIFY_TOKEN, response.data.verifyToken);

      // Dispatch show reset Password Screen
      dispatch(showPage());

      dispatch(setStatus(Status.Loaded));
    } catch (e) {
      if (axios.isAxiosError(e)) {
        switch (e.response!.status) {
          case 406:
            dispatch(codeError("Incorrect code"));
            break;
          case 403:
            dispatch(
              showSnackBar({ isError: true, message: "Verification Timeout" })
            );
            break;
          default:
            dispatch(
              showSnackBar({ isError: true, message: "Unable to verify" })
            );
            break;
        }
      }

      dispatch(setStatus(Status.Error));
    }
  };

export { verifyRegisterAction, verifyForgotPasswordAction };
