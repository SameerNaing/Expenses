import React from "react";

import styles from "./CategoryNameIcon.module.scss";

import { formatDisplay } from "../../utils/formatDate";
import SvgBackground from "../UI/TransactionsCategorySvgIcons/SvgBackground";
import TransactionsCategorySvgIcon from "../UI/TransactionsCategorySvgIcons/TransactionsCategorySvgIcon";

interface Props {
  date: string;
  category: string;
}

const CategoryNameIcon: React.FC<Props> = ({ date, category }) => {
  return (
    <div className={styles.container}>
      <SvgBackground className={styles.svgBackground}>
        <TransactionsCategorySvgIcon category={category} />
      </SvgBackground>
      <div className={styles.nameDateContainer}>
        <span className={styles.name}>{category}</span>
        <span className={styles.date}>{formatDisplay(date)}</span>
      </div>
    </div>
  );
};

export default CategoryNameIcon;
