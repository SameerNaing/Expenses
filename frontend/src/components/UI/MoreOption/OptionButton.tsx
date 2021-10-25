import React from "react";

import styles from "./OptionButton.module.scss";

interface Props {
  btnText: string;
  isDelete?: boolean;
  onClick(): void;
}

const OptionButton: React.FC<Props> = ({
  btnText,
  isDelete = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={isDelete ? styles.deleteButton : styles.button}
    >
      {btnText}
    </button>
  );
};

export default OptionButton;
