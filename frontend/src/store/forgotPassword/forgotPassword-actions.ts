import { setStatus, emailError } from "./forgotPassword-slice";
import { VERIFY_TOKEN } from "../../constants/localStorageKeys";
import api from "../../utils/api";
import { Status } from "../../constants/status";
import { showSnackBar } from "../snackbar/snackbar-slice";
import { showPage } from "../verifyEmail/verifyEmail-slice";
import axios from "axios";

const forgotPasswordAction = (email: string) => async (dispatch: Function) => {
  /** if user did not enter email, show error message */
  if (email.trim().length === 0) {
    return dispatch(emailError("Enter your email."));
  }

  /** show loading */
  dispatch(setStatus(Status.Loading));

  try {
    /** send reset email request */
    const response = await api.forgotPassword({ email });
    /** store verification Token to local storage */
    localStorage.setItem(VERIFY_TOKEN, response.data.verifyToken);

    /** show verification code screen */
    dispatch(showPage({ isVerifyRegister: false, email }));
    /** set loading status to done */
    dispatch(setStatus(Status.Loaded));
  } catch (e) {
    if (axios.isAxiosError(e) && e.response!.status === 404) {
      dispatch(emailError("Email does not exists"));
    } else {
      dispatch(
        showSnackBar({ isError: true, message: "Something went wrong!" })
      );
    }

    dispatch(setStatus(Status.Error));
  }
};

export default forgotPasswordAction;
