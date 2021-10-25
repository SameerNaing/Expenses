import React from "react";

import styles from "./PageError.module.scss";

interface Props {
  onClick(): void;
  marginTop?: string | null;
  marginBottom?: string | null;
}

const PageError: React.FC<Props> = ({
  onClick,
  marginTop = null,
  marginBottom = null,
}) => {
  return (
    <div
      style={{ marginTop: marginTop || "", marginBottom: marginBottom || "" }}
      className={styles.container}
    >
      <h3 className={styles.text}>Unable to get data</h3>
      <button onClick={onClick} className={styles.button}>
        Try again
      </button>
    </div>
  );
};

export default PageError;
