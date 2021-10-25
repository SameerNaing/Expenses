import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";

import { RootState } from "../store";
import { Status } from "../constants/status";
import * as routes from "../constants/routeNameConstants";
import { setInit } from "../store/resetPassword/resetPassword-slice";

import ResetPassword from "../components/forgotResetPasswordVerify/ResetPassword";
import resetPasswordAction from "../store/resetPassword/resetPassword-actions";

function ResetPasswordPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.resetPassword);

  const {
    show,
    newPasswordFieldError,
    newPasswordFieldErrorMessage,
    conformPasswordFieldError,
    conformPasswordFieldMessage,
    status,
  } = state;

  const onSubmit = (newPassword: string, conformPassword: string) =>
    dispatch(resetPasswordAction(newPassword, conformPassword));

  useEffect(() => {
    if (status === Status.Loaded) {
      history.replace(routes.LOGIN_ROUTE);
    }
  }, [status]);

  useEffect(() => {
    return () => {
      dispatch(setInit());
    };
  }, []);

  return (
    <>
      {show ? (
        <ResetPassword
          isLoading={status === Status.Loading}
          newPasswordError={newPasswordFieldError}
          newPasswordErrorMessage={newPasswordFieldErrorMessage}
          conformPasswordError={conformPasswordFieldError}
          conformPasswordErrorMessage={conformPasswordFieldMessage}
          onFormSubmit={onSubmit}
        />
      ) : (
        <Redirect to={routes.LOGIN_ROUTE} />
      )}
    </>
  );
}

export default ResetPasswordPage;
