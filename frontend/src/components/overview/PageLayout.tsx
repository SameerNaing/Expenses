import React from "react";

import styles from "./PageLayout.module.scss";

interface Props {
  totalBalance: React.ReactNode;
  prevDateDataChart: React.ReactNode;
  todayExpenseIncome: React.ReactNode;
  biggestExpenseCategories: React.ReactNode;
}

const PageLayout: React.FC<Props> = ({
  totalBalance,
  prevDateDataChart,
  todayExpenseIncome,
  biggestExpenseCategories,
}) => {
  return (
    <div className={styles.layout}>
      <div className={styles.totalBalanceBarChartContainer}>
        {totalBalance}
        {prevDateDataChart}
      </div>
      <div className={styles.todayIncomeSpentContainer}>
        {todayExpenseIncome}
      </div>
      <div className={styles.biggestExpenseCategoryContainer}>
        {biggestExpenseCategories}
      </div>
    </div>
  );
};

export default PageLayout;
