import React, { useRef } from "react";
import styles from "./VerifyEmail.module.scss";

import MobileTabletAppLogo from "../loginRegister/loginRegisterComponents/MobileTabletAppLogo";
import Header from "../loginRegister/loginRegisterComponents/Header";
import Subheader from "../loginRegister/loginRegisterComponents/Subheader";
import Input from "../loginRegister/loginRegisterComponents/Input";
import Button from "../loginRegister/loginRegisterComponents/Button";

interface Props {
  /** form submitting status */
  isLoading: boolean;
  /** user email to diplay */
  email: string;
  /** user enter code error */
  isError: boolean;
  /** user enter code error message */
  errorMessage: string;
  /** function to execute on form submit */
  onFormSubmit(verificationCode: string): void;
}

/** Page design for verify Email */
const VerifyEmail: React.FC<Props> = ({
  isLoading,
  onFormSubmit,
  email,
  isError,
  errorMessage,
}) => {
  const verificationCodeRef = useRef<HTMLInputElement>(null);

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLoading) {
      onFormSubmit(verificationCodeRef.current!.value);
    }
  };

  return (
    <div className={styles.verifyEmailContainer}>
      <MobileTabletAppLogo />
      <form onSubmit={formSubmitHandler}>
        <Header text="Verify Email" />
        <Subheader
          text={`Please enter the verification code send to ${email}`}
        />
        <Input
          ref={verificationCodeRef}
          labelName="Code"
          type="number"
          isError={isError}
          errorText={errorMessage}
        />
        <Button isLoading={isLoading} buttonText="Verify" />
      </form>
    </div>
  );
};

export default VerifyEmail;
