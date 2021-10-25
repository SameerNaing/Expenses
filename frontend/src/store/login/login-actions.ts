import axios from "axios";

import api from "../../utils/api";
import checkInputDataEmpty from "../../utils/checkInputDataEmpty";
import UserModel from "../../models/userModel";
import { loading, error, done, emailError, passwordError } from "./login-slice";
import { showSnackBar } from "../snackbar/snackbar-slice";
import { VERIFY_TOKEN } from "../../constants/localStorageKeys";

export default (email: string, password: string) =>
  async (dispatch: Function) => {
    /** Dispatch status to loading */
    dispatch(loading());

    /** Check any user input data empty */
    const dataEmpty = checkInputDataEmpty([
      {
        data: email,
        onEmpty: dispatch.bind(null, emailError("Please enter your email")),
      },
      {
        data: password,
        onEmpty: dispatch.bind(
          null,
          passwordError("Please enter your password")
        ),
      },
    ]);

    /** If any input data empty return from function */
    if (dataEmpty) return dispatch(error());

    try {
      const response = await api.login({ email, password });
      const { userID, username, accessToken, refreshToken } = response.data;
      const user = new UserModel(userID, username, accessToken, refreshToken);

      /** IF verify token exists in local storage */
      localStorage.removeItem(VERIFY_TOKEN);

      /** Save user data to local storage */
      user.save();

      dispatch(done());
    } catch (e) {
      if (axios.isAxiosError(e)) {
        switch (e.response!.status) {
          case 401:
            dispatch(passwordError("Incorrect Password"));
            break;
          case 402:
            dispatch(emailError("Email does not exists"));
            break;
          default:
            dispatch(
              showSnackBar({ isError: true, message: "Unable to Login" })
            );
        }
      }

      dispatch(error());
    }
  };
