import React from "react";

import styles from "./MobileNavigationLabel.module.scss";

interface Props {
  labelName: string;
}

/**
 * Gives Lable for Bottom Navigation of Mobile and Tablet
 */
const NavigationLabel: React.FC<Props> = ({ labelName }) => {
  return <span className={styles.label}>{labelName}</span>;
};

export default NavigationLabel;
