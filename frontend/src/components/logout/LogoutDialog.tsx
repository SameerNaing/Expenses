import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import styles from "./LogoutDialog.module.scss";

import { RootState } from "../../store";
import { Status } from "../../constants/status";
import logoutAction from "../../store/logout/logout-action";
import { setLogoutDialog } from "../../store/logout/logout-slice";
import * as routes from "../../constants/routeNameConstants";

import Backdrop from "../UI/Backdrop/Backdrop";
import PrimarySecondaryButtonLayout from "../UI/PrimarySecondaryButton/PrimarySecondaryBtnLayout";
import PrimarySecondaryBtn from "../UI/PrimarySecondaryButton/PrimarySecondaryBtn";

function LogoutDialog() {
  const dispatch = useDispatch();
  const history = useHistory();

  /** Reducer States */
  const states = useSelector((state: RootState) => state.logout);
  const { logoutDialog, logoutStatus } = states;

  const onLogout = () => {
    if (logoutStatus !== Status.Loading) {
      dispatch(logoutAction());
    }
  };
  const onCancle = () => {
    if (logoutStatus !== Status.Loading) {
      dispatch(setLogoutDialog(false));
    }
  };

  useEffect(() => {
    if (logoutStatus === Status.Loaded) {
      history.replace(routes.LOGIN_ROUTE);
    }
  }, [logoutStatus, history]);

  return (
    <>
      {logoutDialog && <Backdrop />}

      {logoutDialog && (
        <div className={styles.logoutDialog}>
          <p>Are you sure you want to logout?</p>
          <PrimarySecondaryButtonLayout className={styles.buttonLayout}>
            <PrimarySecondaryBtn
              primary={false}
              btnText="No"
              onClick={onCancle}
            />
            <PrimarySecondaryBtn
              isLoading={logoutStatus === Status.Loading}
              primary={true}
              btnText="Yes"
              onClick={onLogout}
            />
          </PrimarySecondaryButtonLayout>
        </div>
      )}
    </>
  );
}
export default LogoutDialog;
