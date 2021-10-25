import React from "react";

import styles from "./Layout.module.scss";

import appLogo from "../../assets/images/appLogo.svg";

interface Props {
  /** is login page or register page */
  isLogin: boolean;
  /** pass login form for register form as children node */
  children: React.ReactNode;
}

/**
 * Gives Layout of login and register page for Mobile, Tablet and Desktop View
 */
const Layout: React.FC<Props> = ({ isLogin, children }) => {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.logoGreetContainer}>
        <img src={appLogo} alt="appLogo" />
        <div className={styles.textContainer}>
          <h1>{isLogin ? "Welcome" : "Hello,"}</h1>
          <h1>{isLogin ? "Back!" : "New User"}</h1>
        </div>
      </div>
      <div className={styles.formContainer}>{children}</div>
    </div>
  );
};

export default Layout;
