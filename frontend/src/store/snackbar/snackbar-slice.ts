import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SnackBarStates {
  /** message to show in snackbar */
  message: string;
  /** color of snackbar */
  isError: boolean;
  /** open/close snackbar */
  show: boolean;
}

const initialState: SnackBarStates = {
  message: "",
  isError: false,
  show: false,
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackBar: (
      state,
      action: PayloadAction<{ isError: boolean; message: string }>
    ) => {
      const { isError, message } = action.payload;
      state.message = message;
      state.isError = isError;
      state.show = true;
    },
    closeSnackBar: (state) => {
      state.show = false;
    },
  },
});

export default snackbarSlice.reducer;
export const { showSnackBar, closeSnackBar } = snackbarSlice.actions;
