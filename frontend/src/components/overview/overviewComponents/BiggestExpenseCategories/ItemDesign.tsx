import React from "react";

import styles from "./ItemDesign.module.scss";

import formatAmount from "../../../../utils/formatAmount";
import SvgBackground from "../../../UI/TransactionsCategorySvgIcons/SvgBackground";
import TransactionCategorySvgIcon from "../../../UI/TransactionsCategorySvgIcons/TransactionsCategorySvgIcon";

interface Props {
  categoryName: string;
  spent: number;
}

const ItemDesign: React.FC<Props> = ({ categoryName, spent }) => {
  const formatSpent: string = formatAmount(spent);
  return (
    <div className={styles.itemDesignContainer}>
      <SvgBackground className={styles.svgBackgroundContainer}>
        <TransactionCategorySvgIcon category={categoryName} />
      </SvgBackground>
      <span className={styles.categoryName}>{categoryName}</span>
      <span className={styles.spent}>${formatSpent}</span>
    </div>
  );
};

export default ItemDesign;
