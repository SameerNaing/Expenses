import React from "react";

import styles from "./Subheader.module.scss";

interface Props {
  /** Text to display as Subheader */
  text: string;
}

/**
 * Gives Subhedar for Login and Register Page
 */
const Subheader: React.FC<Props> = ({ text }) => {
  return <h4 className={styles.subHeaderText}>{text}</h4>;
};

export default Subheader;
