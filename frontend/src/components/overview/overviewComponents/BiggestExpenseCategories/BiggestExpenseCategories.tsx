import React from "react";

import styles from "./BiggestExpenseCategories.module.scss";

import NoDataAvailable from "./NoDataAvailable";
import ItemDesign from "./ItemDesign";

interface Props {
  biggestExpense: { categoryName: string; amount: number }[];
}

const BiggestExpenseCategories: React.FC<Props> = ({ biggestExpense }) => {
  return (
    <div className={styles.biggestExpenseCategoriesContainer}>
      <p className={styles.sectionName}>Category with biggest Expenses</p>

      <div className={styles.itemsContainer}>
        {biggestExpense.length === 0 && <NoDataAvailable />}
        {biggestExpense.map((d) => (
          <ItemDesign
            key={d.categoryName}
            categoryName={d.categoryName}
            spent={d.amount}
          />
        ))}
      </div>
    </div>
  );
};

export default BiggestExpenseCategories;
