import { useRef } from "react";

import styles from "./ForgotPassword.module.scss";

import MobileTabletAppLogo from "../loginRegister/loginRegisterComponents/MobileTabletAppLogo";
import Header from "../loginRegister/loginRegisterComponents/Header";
import Subheader from "../loginRegister/loginRegisterComponents/Subheader";
import Input from "../loginRegister/loginRegisterComponents/Input";
import Button from "../loginRegister/loginRegisterComponents/Button";

interface Props {
  /** forgot password form submitting status */
  isLoading: boolean;
  /** Invalid email error */
  emailError: boolean;
  /** email error message */
  errorMessage: string;
  /** Function to execute when user submit form */
  onFormSubmit(email: string): void;
}

/** Page Design for Forgot Password  */
const ForgotPassword: React.FC<Props> = ({
  isLoading,
  emailError,
  errorMessage,
  onFormSubmit,
}) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLoading) {
      onFormSubmit(emailRef.current!.value);
    }
  };
  return (
    <div className={styles.forgotPasswordContainer}>
      <MobileTabletAppLogo />
      <form onSubmit={formSubmitHandler}>
        <Header text="Forgot Password" />
        <Subheader text="Please enter your email." />
        <Input
          ref={emailRef}
          labelName="Email"
          type="email"
          isError={emailError}
          errorText={errorMessage}
        />
        <Button isLoading={isLoading} buttonText="Done" />
      </form>
    </div>
  );
};

export default ForgotPassword;
