import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../../constants/status";

interface ForgotPasswordStates {
  /** status */
  status: Status;
  /** user entered email error */
  emailEnterError: boolean;
  /** error message to display */
  errorMessage: string;
}

const initialState: ForgotPasswordStates = {
  status: Status.Initial,
  emailEnterError: false,
  errorMessage: "",
};

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    /** set states to initial when user leaves the page */
    setInitial: (state) => (state = initialState),

    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
      if (action.payload === Status.Loading) {
        state.emailEnterError = false;
      }
    },
    emailError: (state, action: PayloadAction<string>) => {
      state.emailEnterError = true;
      state.errorMessage = action.payload;
    },
  },
});

export default forgotPasswordSlice.reducer;
export const { setInitial, setStatus, emailError } =
  forgotPasswordSlice.actions;
