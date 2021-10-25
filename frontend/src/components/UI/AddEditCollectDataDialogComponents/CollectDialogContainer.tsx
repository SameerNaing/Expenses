import React from "react";

import styles from "./CollectDialogContainer.module.scss";

interface Props {
  children: React.ReactNode;
}

const CollectDialogContainer: React.FC<Props> = ({ children }) => {
  return <div className={styles.dialog}>{children}</div>;
};
export default CollectDialogContainer;
