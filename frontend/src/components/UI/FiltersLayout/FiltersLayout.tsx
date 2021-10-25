import React from "react";

import styles from "./FiltersLayout.module.scss";

interface Props {
  /** Dropdowns and search bar */
  children: React.ReactNode;
}

/**
 * Layout for dropdowns and search bar for Transactions, Investments and Lend/Borrow Pages
 */
const FiltersLayout: React.FC<Props> = ({ children }) => {
  return <div className={styles.layout}>{children}</div>;
};

export default FiltersLayout;
