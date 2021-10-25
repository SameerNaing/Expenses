import React from "react";
import { Link } from "react-router-dom";

import styles from "./RegisterLoginLink.module.scss";

interface Props {
  isLoginScreen: boolean;
}

/**
 * Link to go register screen or login screen
 */
const RegisterLoginLink: React.FC<Props> = ({ isLoginScreen }) => {
  const path: string = isLoginScreen ? "/register" : "/login";
  return (
    <div className={styles.registerLoginLinkContainer}>
      <p>
        {isLoginScreen ? "Create new Account?" : "Already have an Account?"}
      </p>
      <Link to={path}>{isLoginScreen ? "Register" : "Login"}</Link>
    </div>
  );
};

export default RegisterLoginLink;
