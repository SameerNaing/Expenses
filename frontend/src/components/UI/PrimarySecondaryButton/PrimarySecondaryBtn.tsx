import React from "react";

import Loader from "react-loader-spinner";

import styles from "./PrimarySecondaryBtn.module.scss";

interface Props {
  disabled?: boolean;
  primary?: boolean;
  isLoading?: boolean;
  btnText: string;
  onClick(): void;
}

const PrimarySecondaryBtn: React.FC<Props> = ({
  disabled = false,
  primary = true,
  isLoading = false,
  btnText,
  onClick,
}) => {
  const btnClasses = [
    styles.button,
    primary ? styles.primary : styles.secondary,
    isLoading ? styles.loading : "",
  ];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={btnClasses.join(" ")}
    >
      {isLoading ? (
        <div>
          <Loader height="100%" width="100%" type="ThreeDots" color="white" />
        </div>
      ) : (
        btnText
      )}
    </button>
  );
};

export default PrimarySecondaryBtn;
