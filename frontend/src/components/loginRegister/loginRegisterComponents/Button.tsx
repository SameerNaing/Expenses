import React from "react";

import Loader from "react-loader-spinner";

import styles from "./Button.module.scss";

interface Props {
  /** Text to show on button */
  buttonText: string;
  isLoading?: boolean;
}

/** Login Register Button */
const Button: React.FC<Props> = ({ buttonText, isLoading = false }) => {
  const classNames = [
    styles.loginRegisterButton,
    isLoading ? styles.loading : "",
  ];
  return (
    <button className={classNames.join(" ")}>
      {isLoading ? (
        <div>
          <Loader height="100%" width="100%" type="ThreeDots" color="white" />
        </div>
      ) : (
        buttonText
      )}
    </button>
  );
};

export default Button;
