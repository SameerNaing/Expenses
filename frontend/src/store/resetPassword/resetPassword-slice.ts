import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Status } from "../../constants/status";

interface ResetPasswordStates {
  /** show resetPassword page or not */
  show: boolean;
  /** newPassword input error */
  newPasswordFieldError: boolean;
  /** newPassword input error message */
  newPasswordFieldErrorMessage: string;
  /** conformPassword input error */
  conformPasswordFieldError: boolean;
  /** conformPassword input error message */
  conformPasswordFieldMessage: string;
  /** status */
  status: Status;
}

const initialState: ResetPasswordStates = {
  show: false,
  newPasswordFieldError: false,
  newPasswordFieldErrorMessage: "",
  conformPasswordFieldError: false,
  conformPasswordFieldMessage: "",
  status: Status.Initial,
};

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    setInit: (state) => (state = initialState),
    showPage: (state) => {
      state.show = true;
    },
    setStatus: (state, action: PayloadAction<Status>) => {
      if (action.payload === Status.Loading) {
        state.newPasswordFieldError = false;
        state.conformPasswordFieldError = false;
      }
      state.status = action.payload;
    },
    newPasswordError: (state, action: PayloadAction<string>) => {
      state.newPasswordFieldError = true;
      state.newPasswordFieldErrorMessage = action.payload;
      state.status = Status.Error;
    },
    conformPasswordError: (state, action: PayloadAction<string>) => {
      state.conformPasswordFieldError = true;
      state.conformPasswordFieldMessage = action.payload;
      state.status = Status.Error;
    },
  },
});

export default resetPasswordSlice.reducer;
export const {
  setInit,
  showPage,
  setStatus,
  newPasswordError,
  conformPasswordError,
} = resetPasswordSlice.actions;
