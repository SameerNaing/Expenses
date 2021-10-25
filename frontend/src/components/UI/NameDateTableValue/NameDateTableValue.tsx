import React from "react";

import styles from "./NameDateTableValue.module.scss";

interface Props {
  name: string;
  date: string;
}

/**
 * Name and Date Table value design for Investment and Lend/Borrow Data Table
 */
const NameDateTableValue: React.FC<Props> = ({ name, date }) => {
  return (
    <div className={styles.nameDateContainer}>
      <span className={styles.name}>{name}</span>
      <span className={styles.date}>{date}</span>
    </div>
  );
};

export default NameDateTableValue;
