import React, { useRef } from "react";

import styles from "./Form.module.scss";

import MobileTabletAppLogo from "./loginRegisterComponents/MobileTabletAppLogo";
import Header from "./loginRegisterComponents/Header";
import Subheader from "./loginRegisterComponents/Subheader";
import Input from "./loginRegisterComponents/Input";
import ForgotPasswordLink from "./loginRegisterComponents/ForgotPasswordLink";
import Button from "./loginRegisterComponents/Button";
import RegisterLoginLink from "./loginRegisterComponents/RegisterLoginLink";

/** Input Field error type */
type InputError = {
  isError: boolean;
  errorMessage: string;
};

interface Props {
  /** Text for Header */
  header: string;
  /** Text for Subheader */
  subHeader: string;
  /** is Login Form or Register Form */
  isLoginForm: boolean;
  /** form submit loading */
  isLoading: boolean;
  /** Function to get Form data  */
  onFormSubmit(
    email: string,
    password: string,
    username?: string // only for register Form
  ): void;
  /** user entered email error */
  emailError: InputError;
  /** user entered password error */
  passwordError: InputError;
  /** user entered username error (only for register Form) */
  usernameError?: InputError;
}

/**
 * Gives Form for Login and Register
 */
const Form: React.FC<Props> = ({
  header,
  subHeader,
  isLoginForm,
  isLoading,
  onFormSubmit,
  emailError,
  passwordError,
  usernameError = { isError: false, errorMessage: "" }, // Default value if it is Login Form
}) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const formSubmitHander = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLoading) {
      onFormSubmit(
        emailRef.current!.value,
        passwordRef.current!.value,
        usernameRef.current?.value // only for register form
      );
    }
  };

  return (
    <>
      <MobileTabletAppLogo className={styles.mtLogo} />
      <div className={styles.bodyContainer}>
        <div className={styles.headersContainer}>
          <Header text={header} />
          <Subheader text={subHeader} />
        </div>

        <form onSubmit={formSubmitHander}>
          {!isLoginForm && (
            <Input
              type="text"
              ref={usernameRef}
              labelName="Username"
              isError={usernameError.isError}
              errorText={usernameError.errorMessage}
            />
          )}
          <Input
            type="email"
            ref={emailRef}
            labelName="Email"
            isError={emailError.isError}
            errorText={emailError.errorMessage}
          />
          <Input
            type="password"
            ref={passwordRef}
            labelName="Password"
            isError={passwordError.isError}
            errorText={passwordError.errorMessage}
          />

          {isLoginForm && <ForgotPasswordLink isLoading={false} />}
          <Button
            isLoading={isLoading}
            buttonText={isLoginForm ? "Login" : "Register"}
          />
        </form>
        <RegisterLoginLink isLoginScreen={isLoginForm} />
      </div>
    </>
  );
};

export default Form;
