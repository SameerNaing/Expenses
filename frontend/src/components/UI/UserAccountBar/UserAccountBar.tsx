import { useLocation } from "react-router";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";

import styles from "./UserAccountBar.module.scss";

import { setLogoutDialog } from "../../../store/logout/logout-slice";
import * as routes from "../../../constants/routeNameConstants";
import UserModel from "../../../models/userModel";
import getProfileImgUrl from "../../../utils/profileImg";

function UserAccountBar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const userModel = UserModel.get();
  /**
   * Routes where User Account Bar is shown
   */
  const showPaths: string[] = [
    routes.OVERVIEW_ROUTE,
    routes.TRANSACTIONS_ROUTE,
    routes.INVESTMENTS_ROUTE,
    routes.LENDBORROW_ROUTE,
  ];

  const onLogout = () => dispatch(setLogoutDialog(true));
  return (
    <>
      {showPaths.includes(location.pathname) && (
        <div className={styles.appBarContainer}>
          <div className={styles.imgUsernameContainer}>
            <img
              className={styles.profileImg}
              src={getProfileImgUrl(userModel!.username)}
              alt="profileImg"
            />
            <span className={styles.username}>{userModel!.username}</span>
          </div>
          <button onClick={onLogout} className={styles.logoutButton}>
            <FiLogOut size="20px" color="red" />
          </button>
        </div>
      )}
    </>
  );
}

export default UserAccountBar;
