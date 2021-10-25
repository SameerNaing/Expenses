import React from "react";

import Loader from "react-loader-spinner";

import styles from "./PageLoading.module.scss";

interface Props {
  marginTop?: string | null;
  marginBottom?: string | null;
}

const PageLoading: React.FC<Props> = ({
  marginTop = null,
  marginBottom = null,
}) => {
  return (
    <div
      style={{ marginBottom: marginBottom || "", marginTop: marginTop || "" }}
      className={styles.loaderContainer}
    >
      <Loader height="100%" width="100%" type="TailSpin" color="#434af9" />
    </div>
  );
};

export default PageLoading;
