import React from "react";

import appLogoMT from "../../../assets/images/appLogo-mt.svg";

import styles from "./MobileTabletAppLogo.module.scss";

interface Props {
  className?: string;
}

const MobileTabletAppLogo: React.FC<Props> = ({ className = "" }) => {
  const classNames: string[] = [styles.mtLogoContainer, className];
  return (
    <div className={classNames.join(" ")}>
      <img src={appLogoMT} alt="appLogomt" />
    </div>
  );
};

export default MobileTabletAppLogo;
