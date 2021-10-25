import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Status } from "../../constants/status";

export interface RegisterState {
  /** user name enter error */
  usernameError: boolean;
  /** user name enter error message */
  usernameErrorMessage: string;
  /** email enter error */
  emailError: boolean;
  /** email enter error message */
  emailErrorMessage: string;
  /** password enter error */
  passwordError: boolean;
  /** password enter error message */
  passwordErrorMessage: string;
  /** status */
  status: Status;
}

const initialState: RegisterState = {
  usernameError: false,
  usernameErrorMessage: "",
  emailError: false,
  emailErrorMessage: "",
  passwordError: false,
  passwordErrorMessage: "",
  status: Status.Initial,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setInitial: (state) => (state = initialState),
    loading: (state) => {
      state.usernameError = false;
      state.emailError = false;
      state.passwordError = false;
      state.status = Status.Loading;
    },
    error: (state) => {
      state.status = Status.Error;
    },
    done: (state) => {
      state.status = Status.Loaded;
    },
    usernameError: (state, action: PayloadAction<string>) => {
      state.usernameError = true;
      state.usernameErrorMessage = action.payload;
    },
    emailError: (state, action: PayloadAction<string>) => {
      state.emailError = true;
      state.emailErrorMessage = action.payload;
    },
    passwordError: (state, action: PayloadAction<string>) => {
      state.passwordError = true;
      state.passwordErrorMessage = action.payload;
    },
  },
});

export const {
  setInitial,
  loading,
  error,
  done,
  usernameError,
  emailError,
  passwordError,
} = registerSlice.actions;

export default registerSlice.reducer;
