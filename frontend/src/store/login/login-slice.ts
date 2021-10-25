import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Status } from "../../constants/status";

export interface LoginState {
  emailError: boolean;
  emailErrorMessage: string;
  passwordError: boolean;
  passwordErrorMessage: string;
  status: Status;
}

const initialState: LoginState = {
  emailError: false,
  emailErrorMessage: "",
  passwordError: false,
  passwordErrorMessage: "",
  status: Status.Initial,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setInitial: (state) => (state = initialState),
    loading: (state) => {
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

export const { setInitial, loading, error, done, emailError, passwordError } =
  loginSlice.actions;
export default loginSlice.reducer;
