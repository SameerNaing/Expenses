import React, { useRef } from "react";

import styles from "./ResetPassword.module.scss";

import MobileTabletAppLogo from "../loginRegister/loginRegisterComponents/MobileTabletAppLogo";
import Header from "../loginRegister/loginRegisterComponents/Header";
import Subheader from "../loginRegister/loginRegisterComponents/Subheader";
import Input from "../loginRegister/loginRegisterComponents/Input";
import Button from "../loginRegister/loginRegisterComponents/Button";

interface Props {
  /** Reset password form submitting status */
  isLoading: boolean;
  /** Error on newPassword Input Field */
  newPasswordError: boolean;
  /** newPassowrd Input Field Error message */
  newPasswordErrorMessage: string;
  /** Error on conformPassword Input Field */
  conformPasswordError: boolean;
  /** conformPassword Input Field Error message */
  conformPasswordErrorMessage: string;
  /** function to execute when user submit form */
  onFormSubmit(newPassword: string, conformPassword: string): void;
}

/** Page Design for Reset password */
const ResetPassword: React.FC<Props> = ({
  isLoading,
  newPasswordError,
  newPasswordErrorMessage,
  conformPasswordError,
  conformPasswordErrorMessage,
  onFormSubmit,
}) => {
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const conformPasswordRef = useRef<HTMLInputElement>(null);

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLoading) {
      onFormSubmit(
        newPasswordRef.current!.value,
        conformPasswordRef.current!.value
      );
    }
  };

  return (
    <div className={styles.resetPasswordContainer}>
      <MobileTabletAppLogo />
      <form onSubmit={formSubmitHandler}>
        <Header text="Reset Password" />
        <Subheader text="Please enter a new password," />
        <Input
          ref={newPasswordRef}
          labelName="New Password"
          type="password"
          isError={newPasswordError}
          errorText={newPasswordErrorMessage}
        />
        <Input
          ref={conformPasswordRef}
          labelName="Conform Password"
          type="password"
          isError={conformPasswordError}
          errorText={conformPasswordErrorMessage}
        />
        <Button isLoading={isLoading} buttonText="Done" />
      </form>
    </div>
  );
};

export default ResetPassword;
