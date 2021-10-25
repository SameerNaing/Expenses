import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import * as routes from "../constants/routeNameConstants";
import loginAction from "../store/login/login-actions";
import { RootState } from "../store";
import { setInitial } from "../store/login/login-slice";
import { Status } from "../constants/status";
import Layout from "../components/loginRegister/Layout";
import Form from "../components/loginRegister/Form";

function LoginPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const states = useSelector((state: RootState) => state.login);
  const {
    emailError,
    emailErrorMessage,
    passwordError,
    passwordErrorMessage,
    status,
  } = states;

  /** Function to execute on Login Form submit */
  const onFormSubmit = (email: string, password: string) =>
    dispatch(loginAction(email, password));

  /** Track status if done go to overview page */
  useEffect(() => {
    if (status === Status.Loaded) {
      history.replace(routes.OVERVIEW_ROUTE);
    }
  }, [status]);

  /** Set login states to initial when user leaves this page */
  useEffect(() => {
    return () => {
      dispatch(setInitial());
    };
  }, []);

  return (
    <Layout isLogin={true}>
      <Form
        header="Login"
        subHeader="Welcome back! Please login to your account"
        isLoginForm={true}
        isLoading={status === Status.Loading}
        onFormSubmit={onFormSubmit}
        emailError={{ isError: emailError, errorMessage: emailErrorMessage }}
        passwordError={{
          isError: passwordError,
          errorMessage: passwordErrorMessage,
        }}
      />
    </Layout>
  );
}

export default LoginPage;
