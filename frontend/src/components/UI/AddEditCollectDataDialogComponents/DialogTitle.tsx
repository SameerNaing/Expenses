import React from "react";

import styles from "./DialogTitle.module.scss";

interface Props {
  title: string;
}

/**
 * Dialog Title Design
 */
const DialogTitle: React.FC<Props> = ({ title }) => {
  return <h3 className={styles.title}>{title}</h3>;
};

export default DialogTitle;
