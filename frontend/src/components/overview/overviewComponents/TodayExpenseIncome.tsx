import React from "react";
import { Doughnut } from "react-chartjs-2";

import styles from "./TodayExpenseIncome.module.scss";

import {
  formatDonutChartData,
  donutChartOptions,
} from "../../../utils/donutChartConfig";

interface Props {
  spent: number;
  income: number;
}

const TodayExpenseIncome: React.FC<Props> = ({ spent, income }) => {
  return (
    <div className={styles.todayExpenseIncomeContainer}>
      <p className={styles.titleText}>Today Income and Spent</p>
      {spent === 0 && income === 0 ? (
        <p className={styles.noData}>No Data Available</p>
      ) : (
        <div className={styles.donutChartContainer}>
          <Doughnut
            data={formatDonutChartData(spent, income)}
            options={donutChartOptions}
          />
        </div>
      )}
    </div>
  );
};

export default TodayExpenseIncome;
