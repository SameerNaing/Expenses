import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { RootState } from "../store";
import { Status } from "../constants/status";
import forgotPasswordAction from "../store/forgotPassword/forgotPassword-actions";
import { setInitial } from "../store/forgotPassword/forgotPassword-slice";
import * as routes from "../constants/routeNameConstants";

import ForgotPassword from "../components/forgotResetPasswordVerify/ForgotPassword";

function ForgotPasswordPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.forgotPassword);
  const { status, emailEnterError, errorMessage } = state;

  const onSubmit = (email: string) => dispatch(forgotPasswordAction(email));

  useEffect(() => {
    if (status === Status.Loaded) {
      history.replace(routes.VERIFY_EMAIL_ROUTE);
    }
  }, [status]);

  useEffect(() => {
    return () => {
      dispatch(setInitial());
    };
  }, []);

  return (
    <ForgotPassword
      isLoading={status === Status.Loading}
      emailError={emailEnterError}
      errorMessage={errorMessage}
      onFormSubmit={onSubmit}
    />
  );
}

export default ForgotPasswordPage;
