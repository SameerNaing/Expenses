import React from "react";

import styles from "./Title.module.scss";

interface Props {
  title: string;
}

/** display header of 'Due' or 'All' above the LendBorrow Data Table  */
const Title: React.FC<Props> = ({ title }) => {
  return <h3 className={styles.title}>{title}</h3>;
};

export default Title;
