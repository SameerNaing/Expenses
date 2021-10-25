import React from "react";

import styles from "./InputField.module.scss";

interface Props {
  label: string;
  containerClass?: string;
  isTextArea?: boolean;
  textAreaClass?: string;
  inputClass?: string;
  name: string;
  value: string | number;
  id: string;
  type: string;
  disable?: boolean;
  min?: number | string;
  onChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ): void;
}

const InputField: React.FC<Props> = ({
  label,
  containerClass = "",
  isTextArea = false,
  textAreaClass = "",
  inputClass = "",
  name,
  value,
  type,
  id,
  min = "",
  disable = false,
  onChange,
}) => {
  return (
    <div className={[styles.inputContainer, containerClass].join(" ")}>
      <label
        htmlFor={id}
        className={[styles.label, disable ? styles.labelDisable : ""].join(" ")}
      >
        {label}
      </label>
      {isTextArea ? (
        <textarea
          value={value}
          name={name}
          onChange={onChange}
          className={[styles.textArea, textAreaClass].join(" ")}
        ></textarea>
      ) : (
        <input
          min={min}
          disabled={disable}
          name={name}
          value={value}
          type={type}
          id={id}
          className={[styles.input, inputClass].join(" ")}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default InputField;
