import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router";

import * as routes from "../constants/routeNameConstants";
import { RootState } from "../store";
import { setInitial } from "../store/verifyEmail/verifyEmail-slice";
import { Status } from "../constants/status";
import {
  verifyRegisterAction,
  verifyForgotPasswordAction,
} from "../store/verifyEmail/verifyEmail-actions";

import VerifyEmail from "../components/forgotResetPasswordVerify/VerifyEmail";

function VerifyEmailPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.verifyEmail);
  const {
    show,
    email,
    isVerifyRegister,
    verificationCodeError,
    verificationCodeErrorMessage,
    status,
  } = state;
  const onSubmit = (verificationCode: string) => {
    if (isVerifyRegister) {
      dispatch(verifyRegisterAction(verificationCode));
    } else {
      dispatch(verifyForgotPasswordAction(verificationCode));
    }
  };

  useEffect(() => {
    if (status === Status.Loaded) {
      if (isVerifyRegister) {
        history.replace(routes.OVERVIEW_ROUTE);
      } else {
        history.replace(routes.RESET_PASSWORD_ROUTE);
      }
    }
  }, [status]);

  useEffect(() => {
    return () => {
      dispatch(setInitial());
    };
  }, []);

  return (
    <>
      {show ? (
        <VerifyEmail
          isError={verificationCodeError}
          errorMessage={verificationCodeErrorMessage}
          email={email}
          isLoading={status === Status.Loading}
          onFormSubmit={onSubmit}
        />
      ) : (
        <Redirect to={routes.LOGIN_ROUTE} />
      )}
    </>
  );
}

export default VerifyEmailPage;
