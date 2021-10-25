import React from "react";

import styles from "./FloatingActionButton.module.scss";

import { IoAddOutline } from "react-icons/io5";

interface Props {
  onClick(): void;
}

/** Add Data Button on Mobile and Laptop view for Transaction, Lend/Borrow and Investment Pages  */
const FloatingActionButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.floatingActionButton}>
      <IoAddOutline color="white" size="22px" />
    </button>
  );
};
export default FloatingActionButton;
