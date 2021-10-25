import React from "react";

import styles from "./AddEditDialogContainer.module.scss";

interface Props {
  children: React.ReactNode;
}

const DialogContainer: React.FC<Props> = ({ children }) => {
  return <div className={styles.dialog}>{children}</div>;
};

export default DialogContainer;
