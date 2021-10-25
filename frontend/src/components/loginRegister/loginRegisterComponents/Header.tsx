import React from "react";

import styles from "./Header.module.scss";

interface Props {
  /** Text to display as Header */
  text: string;
}

/**
 * Gives Header Text for Login or Register Page
 */
const Header: React.FC<Props> = ({ text }) => {
  return <h1 className={styles.headerText}>{text}</h1>;
};

export default Header;
