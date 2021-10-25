import React from "react";

import styles from "./SelectDropdown.module.scss";

import { categoriesList } from "../../../constants/categories";
import { PROFITED, LOST } from "../../../constants/investmentStatus";
import { LEND_CAT, BORROW_CAT } from "../../../constants/lendBorrowConsts";

interface Props {
  name: string;
  containerClass?: string;
  isCategory?: boolean;
  isInvestmentStatus?: boolean;
  isLendBorrow?: boolean;
  value: string;
  onChange(e: React.ChangeEvent<HTMLSelectElement>): void;
}

const SelectDropdown: React.FC<Props> = ({
  name,
  containerClass = "",
  isCategory = false,
  isInvestmentStatus = false,
  isLendBorrow = false,
  value,
  onChange,
}) => {
  return (
    <div className={[styles.container, containerClass].join(" ")}>
      <select
        onChange={onChange}
        value={value}
        name={name}
        className={styles.select}
      >
        {(isCategory || isLendBorrow) && (
          <option value="">Select Category</option>
        )}
        {isInvestmentStatus && <option value="">Select Status</option>}
        {isCategory &&
          categoriesList.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        {isInvestmentStatus &&
          [PROFITED, LOST].map((status, i) => (
            <option key={i} value={status}>
              {status}
            </option>
          ))}

        {isLendBorrow &&
          [LEND_CAT, BORROW_CAT].map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectDropdown;
