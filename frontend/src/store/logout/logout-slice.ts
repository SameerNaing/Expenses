import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Status } from "../../constants/status";

interface LogoutStates {
  /** open/close logout dialog */
  logoutDialog: boolean;
  /** logging out status */
  logoutStatus: Status;
}

const initialState: LogoutStates = {
  logoutDialog: false,
  logoutStatus: Status.Initial,
};

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<Status>) => {
      state.logoutStatus = action.payload;
    },
    setLogoutDialog: (state, action: PayloadAction<boolean>) => {
      state.logoutDialog = action.payload;
    },
  },
});

export default logoutSlice.reducer;
export const { setStatus, setLogoutDialog } = logoutSlice.actions;
