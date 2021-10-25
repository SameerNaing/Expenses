import styles from "./DesktopNavigationApplogo.module.scss";

import navigationLogo from "../../../../assets/images/NavigationLogo.png";

function NavigationAppLogo() {
  return (
    <img
      className={styles.naviAppLogo}
      src={navigationLogo}
      alt="naviAppLogo"
    />
  );
}

export default NavigationAppLogo;
