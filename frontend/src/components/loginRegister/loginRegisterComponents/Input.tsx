import React from "react";

import styles from "./Input.module.scss";

interface Props {
  /** label name for input */
  labelName: string;
  /** input field type */
  type: string;
  /** show error message or not */
  isError: boolean;
  /** text to show on error */
  errorText: string;
}

/**
 * Input Field
 */
const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ labelName, type, isError, errorText }, ref) => {
    return (
      <div className={styles.inputErrorContainer}>
        <label htmlFor={labelName}>{labelName}</label>
        <input
          autoComplete="off"
          ref={ref}
          className={isError ? styles.errorBorder : ""}
          id={labelName}
          type={type}
          placeholder={labelName}
        />
        {isError && <p>*{errorText}</p>}
      </div>
    );
  }
);

export default Input;
