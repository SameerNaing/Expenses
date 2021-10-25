import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Status } from "../../constants/status";

interface VerifyEmailState {
  /** show verify code screen */
  show: boolean;
  /** email to display */
  email: string;
  /** verify code for register user or reset password */
  isVerifyRegister: boolean;
  /** verify code enter error */
  verificationCodeError: boolean;
  /** verify code enter error message */
  verificationCodeErrorMessage: string;
  /** status */
  status: Status;
}

const initialState: VerifyEmailState = {
  show: false,
  email: "",
  isVerifyRegister: false,
  verificationCodeError: false,
  verificationCodeErrorMessage: "",
  status: Status.Initial,
};

const verifyEmailSlice = createSlice({
  name: "verifyEmail",
  initialState,
  reducers: {
    setInitial: (state) => (state = initialState),
    showPage: (
      state,
      action: PayloadAction<{ isVerifyRegister: boolean; email: string }>
    ) => {
      const { isVerifyRegister, email } = action.payload;
      state.show = true;
      state.isVerifyRegister = isVerifyRegister;
      state.email = email;
    },
    codeError: (state, action: PayloadAction<string>) => {
      state.verificationCodeError = true;
      state.verificationCodeErrorMessage = action.payload;
    },
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
      if (action.payload === Status.Loading) {
        state.verificationCodeError = false;
      }
    },
  },
});

export const { setInitial, showPage, codeError, setStatus } =
  verifyEmailSlice.actions;
export default verifyEmailSlice.reducer;
