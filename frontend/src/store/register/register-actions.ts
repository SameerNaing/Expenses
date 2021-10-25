import axios from "axios";

import api from "../../utils/api";
import checkInputDataEmpty from "../../utils/checkInputDataEmpty";
import { VERIFY_TOKEN } from "../../constants/localStorageKeys";
import {
  loading,
  error,
  done,
  usernameError,
  emailError,
  passwordError,
} from "./register-slice";
import { showPage } from "../verifyEmail/verifyEmail-slice";
import { showSnackBar } from "../snackbar/snackbar-slice";

export default (username: string, email: string, password: string) =>
  async (dispatch: Function) => {
    /** Dispatch status to loading */
    dispatch(loading());

    /** Check any user input data empty */
    const dataEmpty = checkInputDataEmpty([
      {
        data: username,
        onEmpty: dispatch.bind(null, usernameError("Please Enter your name")),
      },
      {
        data: email,
        onEmpty: dispatch.bind(null, emailError("Please Enter your email")),
      },
      {
        data: password,
        onEmpty: dispatch.bind(
          null,
          passwordError("Please Enter your password")
        ),
      },
    ]);

    /** If any input data empty return from function */
    if (dataEmpty) return dispatch(error());

    /** If password length is less than empty return from function */
    if (password.length < 6) {
      dispatch(passwordError("Password should be longer than 6 characters"));
      dispatch(error());
      return;
    }

    try {
      const response = await api.register({ username, email, password });
      localStorage.setItem(VERIFY_TOKEN, response.data.verifyToken);

      dispatch(showPage({ isVerifyRegister: true, email }));
      dispatch(done());
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response!.status === 403) {
          dispatch(emailError("User already Exists"));
        } else {
          dispatch(
            showSnackBar({ isError: true, message: "Unable to Register" })
          );
        }
      }

      dispatch(error());
    }
  };
