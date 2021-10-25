import React from "react";

import styles from "./Layout.module.scss";

interface Props {
  children: React.ReactNode;
}

const FormLayout: React.FC<Props> = ({ children }) => {
  return <div className={styles.layout}>{children}</div>;
};

export default FormLayout;
