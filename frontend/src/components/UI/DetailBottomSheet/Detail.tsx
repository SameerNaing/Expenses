import React from "react";

import styles from "./Detail.module.scss";

interface Props {
  name: string;
  data: string;
}

const Detail: React.FC<Props> = ({ name, data }) => {
  return (
    <div className={styles.detailContainer}>
      <span>{name}</span>
      <span>{data}</span>
    </div>
  );
};

export default Detail;
