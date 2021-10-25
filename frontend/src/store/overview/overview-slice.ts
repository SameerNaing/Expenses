import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Status } from "../../constants/status";

interface OverviewPageStates {
  pageStatus: Status;
  overview: OverviewPageDataModel | null;
}

const initialState: OverviewPageStates = {
  pageStatus: Status.Initial,
  overview: null,
};

const overviewSlice = createSlice({
  name: "overview",
  initialState,
  reducers: {
    setPageStatus: (
      state,
      action: PayloadAction<{
        status: Status;
        overview: OverviewPageDataModel | null;
      }>
    ) => {
      state.pageStatus = action.payload.status;
      if (action.payload.status === Status.Loaded) {
        state.overview = action.payload.overview;
      }
    },
  },
});

export default overviewSlice.reducer;
export const { setPageStatus } = overviewSlice.actions;
