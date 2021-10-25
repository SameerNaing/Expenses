import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import * as routes from "../constants/routeNameConstants";
import registerAction from "../store/register/register-actions";
import { RootState } from "../store";
import { setInitial } from "../store/register/register-slice";
import { Status } from "../constants/status";
import Layout from "../components/loginRegister/Layout";
import Form from "../components/loginRegister/Form";

function RegisterPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const states = useSelector((state: RootState) => state.register);
  const {
    usernameError,
    usernameErrorMessage,
    emailError,
    emailErrorMessage,
    passwordError,
    passwordErrorMessage,
    status,
  } = states;

  /** Function to execute on Register Form submit */
  const onFormSubmit = (email: string, password: string, username: string) =>
    dispatch(registerAction(username, email, password));

  /** Track status if done go to verify registerPage */
  useEffect(() => {
    if (status === Status.Loaded) {
      history.push(routes.VERIFY_EMAIL_ROUTE);
    }
  }, [status]);

  /** Set register states to initial when user leaves this page*/
  useEffect(() => {
    return () => {
      dispatch(setInitial());
    };
  }, []);

  return (
    <Layout isLogin={false}>
      <Form
        header="Register"
        subHeader="Hello New User, Please create your account."
        isLoginForm={false}
        isLoading={status === Status.Loading}
        onFormSubmit={onFormSubmit}
        emailError={{ isError: emailError, errorMessage: emailErrorMessage }}
        passwordError={{
          isError: passwordError,
          errorMessage: passwordErrorMessage,
        }}
        usernameError={{
          isError: usernameError,
          errorMessage: usernameErrorMessage,
        }}
      />
    </Layout>
  );
}

export default RegisterPage;
