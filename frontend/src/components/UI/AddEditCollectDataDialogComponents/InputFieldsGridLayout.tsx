import React from "react";

import styles from "./InputFieldsGridLayout.module.scss";

interface Props {
  children: React.ReactNode;
}

const InputFieldsGridLayout: React.FC<Props> = ({ children }) => {
  return <div className={styles.layout}>{children}</div>;
};

export default InputFieldsGridLayout;
