import React from "react";
import { RiMore2Fill } from "react-icons/ri";

import styles from "./TableMoreButton.module.scss";

interface Props {
  onClick(): void;
}

const TableMoreButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      <RiMore2Fill size="100%" />
    </button>
  );
};

export default TableMoreButton;
