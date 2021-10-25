import { Link } from "react-router-dom";

import styles from "./NotFound.module.scss";

import * as routes from "../../constants/routeNameConstants";

function NotFound() {
  return (
    <div className={styles.notFoundLayout}>
      <h1>404</h1>
      <p>The page you are looking is unavailable</p>
      <Link to={routes.INITIAL_ROUTE}>Return to home</Link>
    </div>
  );
}

export default NotFound;
