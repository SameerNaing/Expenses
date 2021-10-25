import React from "react";
import { Link } from "react-router-dom";

import styles from "./ForgotPasswordLink.module.scss";

interface Props {
  /** if loading link will be disable */
  isLoading: boolean;
}

/** Forgot Password Link */
const ForgotPasswordLink: React.FC<Props> = ({ isLoading }) => {
  return (
    <div className={styles.forgotPasswordContainer}>
      <Link to="/forgotPassword">Forgot password?</Link>
    </div>
  );
};

export default ForgotPasswordLink;
