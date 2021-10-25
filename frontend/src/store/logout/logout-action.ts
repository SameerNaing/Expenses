import { setStatus, setLogoutDialog } from "./logout-slice";
import { showSnackBar } from "../snackbar/snackbar-slice";

import api from "../../utils/api";
import UserModel from "../../models/userModel";
import { Status } from "../../constants/status";

const logoutAction = () => async (dispatch: Function) => {
  dispatch(setStatus(Status.Loading));
  const userID: string = UserModel.get()!.userID;
  const refreshToken: string = UserModel.get()!.refreshToken;
  try {
    await api.logout({ userID, refreshToken });
    UserModel.deleteSave();
    dispatch(setStatus(Status.Loaded));
    dispatch(setLogoutDialog(false));
  } catch (e) {
    dispatch(setStatus(Status.Error));
    dispatch(showSnackBar({ isError: true, message: "Unable to logout" }));
  }
};

export default logoutAction;
