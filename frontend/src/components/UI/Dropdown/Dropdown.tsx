import React from "react";

import styles from "./Dropdown.module.scss";

interface Props {
  options: (string | number)[];
  onChange(event: React.ChangeEvent<HTMLSelectElement>): void;
  name: string;
  value: string | number;
  disable: boolean;
}

const Dropdown: React.FC<Props> = ({
  options,
  onChange,
  name,
  value,
  disable,
}) => {
  return (
    <select
      disabled={disable}
      name={name}
      value={value}
      onChange={onChange}
      className={styles.dropdown}
    >
      {options.map((o, index) => (
        <option key={index} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
