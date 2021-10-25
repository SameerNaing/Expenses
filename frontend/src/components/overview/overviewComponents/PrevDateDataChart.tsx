import React from "react";
import { Bar } from "react-chartjs-2";

import styles from "./PrevDateDataChart.module.scss";

import {
  formatBarPlotData,
  barPlotOption,
} from "../../../utils/barPlotConfigs";

interface Props {
  labels: string[];
  spentData: number[];
  incomeData: number[];
}

const PrevDateDataChart: React.FC<Props> = ({
  labels,
  spentData,
  incomeData,
}) => {
  return (
    <div className={styles.chartContainer}>
      <p>Previous Days Income and Spent</p>
      <div className={styles.barContainer}>
        <Bar
          options={barPlotOption}
          data={formatBarPlotData(labels, spentData, incomeData)}
        />
      </div>
    </div>
  );
};

export default PrevDateDataChart;
