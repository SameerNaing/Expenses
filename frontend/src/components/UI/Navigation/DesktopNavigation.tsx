import React from "react";

import styles from "./DesktopNavigation.module.scss";

import DesktopNavigationAppLogo from "./DesktopNavigationComponents/DesktopNavigationApplogo";
import DesktopNavigationItems from "./DesktopNavigationComponents/DesktopNavigationItems";
import DesktopNavigationLogoutButton from "./DesktopNavigationComponents/DesktopNavigationLogoutButton";

/**
 * Gives Side Navigation for Desktop and Laptop devices
 */
const DesktopNavigation: React.FC = ({ children }) => {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.navigationContainer}>
        <div className={styles.logoContainer}>
          <DesktopNavigationAppLogo />
        </div>
        <div className={styles.navigationItemsContainer}>
          <DesktopNavigationItems />
        </div>
        <div className={styles.logoutButtonContainer}>
          <DesktopNavigationLogoutButton />
        </div>
      </div>
      <div className={styles.childrenContainer}>{children}</div>
    </div>
  );
};

export default DesktopNavigation;
