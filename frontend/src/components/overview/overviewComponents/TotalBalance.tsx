import React from "react";

import styles from "./TotalBalance.module.scss";

import formatAmount from "../../../utils/formatAmount";

interface Props {
  balance: number;
}

const TotalBalance: React.FC<Props> = ({ balance }) => {
  return (
    <div className={styles.totalBalanceContainer}>
      <p className={styles.title}>Total Balance</p>
      <p className={styles.balance}>${formatAmount(balance)}</p>
    </div>
  );
};

export default TotalBalance;
