import {
  setStatus,
  newPasswordError,
  conformPasswordError,
} from "./resetPassword-slice";

import api from "../../utils/api";
import { VERIFY_TOKEN } from "../../constants/localStorageKeys";
import { showSnackBar } from "../snackbar/snackbar-slice";
import { Status } from "../../constants/status";
import axios from "axios";

const resetPasswordAction =
  (newPassword: string, conformPassword: string) =>
  async (dispatch: Function) => {
    dispatch(setStatus(Status.Loading));

    /** if user not enter newPassword show error */
    if (newPassword.trim().length === 0)
      return dispatch(newPasswordError("Enter your new password"));

    /** if user not enter conformPassword show error */
    if (newPassword !== conformPassword)
      return dispatch(conformPasswordError("Conform password does not match"));

    try {
      await api.resetPassword({ newPassword });
      localStorage.removeItem(VERIFY_TOKEN);
      dispatch(setStatus(Status.Loaded));
      dispatch(showSnackBar({ isError: false, message: "Password Reseted" }));
    } catch (e) {
      if (axios.isAxiosError(e) && e.response!.status === 403) {
        dispatch(showSnackBar({ isError: true, message: "Reset Timeout" }));
      } else {
        dispatch(
          showSnackBar({ isError: true, message: "Unable to reset password" })
        );
      }

      dispatch(setStatus(Status.Error));
    }
  };

export default resetPasswordAction;
