import React from "react";

import styles from "./HeaderButton.module.scss";

interface Props {
  headerText: string;
  showButton: boolean;
  onClick(): void;
}

/**
 * Header and Add button for Transaction, Lend/Borrow and Investment Page
 **/
const HeaderButton: React.FC<Props> = ({ headerText, showButton, onClick }) => {
  return (
    <div className={styles.headerButtonContainer}>
      <span className={styles.headerText}>{headerText}</span>
      {showButton && (
        <button onClick={onClick} className={styles.addButton}>
          + Add
        </button>
      )}
    </div>
  );
};

export default HeaderButton;
