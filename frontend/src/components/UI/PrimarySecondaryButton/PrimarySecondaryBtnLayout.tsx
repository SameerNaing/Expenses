import React from "react";

import styles from "./PrimarySecondaryBtnLayout.module.scss";

interface Props {
  className?: string;
}

const PrimarySecondaryButtonLayout: React.FC<Props> = ({
  children,
  className = "",
}) => {
  return <div className={[styles.layout, className].join(" ")}>{children}</div>;
};

export default PrimarySecondaryButtonLayout;
