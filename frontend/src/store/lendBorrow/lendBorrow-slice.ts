import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Status } from "../../constants/status";

interface LendBorrowStates {
  /** Page loading status */
  pageStatus: Status;
  /** Other lend/borrow data which are not reached their due date */
  notDueLendBorrowData: LendBorrowModel[];
  /** lend/borrow data which reached their due date */
  dueLendBorrowData: LendBorrowModel[];
  /** all available years for filter */
  availableYears: number[];
  /** fetching lend/borrow data status expect from due */
  isNotDueDataLoading: boolean;
  /** adding items status */
  itemAddStatus: Status;
  /** updating item status */
  updateItemStatus: Status;
  /** pagination status */
  paginationStatus: Status;
  /** any more data to fetch in pagination */
  hasMoreData: boolean;
}

const initialState: LendBorrowStates = {
  pageStatus: Status.Initial,
  notDueLendBorrowData: [],
  dueLendBorrowData: [],
  availableYears: [],
  isNotDueDataLoading: false,
  itemAddStatus: Status.Initial,
  updateItemStatus: Status.Initial,
  paginationStatus: Status.Loaded,
  hasMoreData: true,
};

const lendBorrowSlice = createSlice({
  name: "lendBorrow",
  initialState,
  reducers: {
    pageLoading: (state) => {
      state.pageStatus = Status.Loading;
    },
    pageError: (state) => {
      state.pageStatus = Status.Error;
    },
    pageLoaded: (
      state,
      action: PayloadAction<{
        notDueData: LendBorrowModel[];
        dueData: LendBorrowModel[];
        availableYear: number[];
      }>
    ) => {
      const { notDueData, dueData, availableYear } = action.payload;
      state.notDueLendBorrowData = notDueData;
      state.dueLendBorrowData = dueData;
      state.availableYears = availableYear;
      state.pageStatus = Status.Loaded;
    },
    setNotDueDataLoading: (
      state,
      action: PayloadAction<{
        isLoading: boolean;
        data: LendBorrowModel[] | null;
      }>
    ) => {
      state.isNotDueDataLoading = action.payload.isLoading;
      state.notDueLendBorrowData = action.payload.data || [];
    },

    setAvailableYear: (state, action: PayloadAction<number[]>) => {
      state.availableYears = action.payload;
    },
    setItemAddStatus: (state, action: PayloadAction<Status>) => {
      state.itemAddStatus = action.payload;
    },

    deleteData: (
      state,
      action: PayloadAction<{ lendBorrowID: string; isDue: boolean }>
    ) => {
      const { lendBorrowID, isDue } = action.payload;
      if (isDue) {
        state.dueLendBorrowData = state.dueLendBorrowData.filter(
          (d) => d.lendBorrowID !== lendBorrowID
        );
      } else {
        state.notDueLendBorrowData = state.notDueLendBorrowData.filter(
          (d) => d.lendBorrowID !== lendBorrowID
        );
      }
    },
    setPagination: (
      state,
      action: PayloadAction<{
        status: Status;
        notDueData: LendBorrowModel[] | null;
      }>
    ) => {
      const { status } = action.payload;
      state.paginationStatus = status;
      if (status === Status.Loaded) {
        state.notDueLendBorrowData.push(...action.payload.notDueData!);
      }
    },
    setHasMoreData: (state, action: PayloadAction<boolean>) => {
      state.hasMoreData = action.payload;
    },
  },
});

export default lendBorrowSlice.reducer;
export const {
  pageLoading,
  pageError,
  pageLoaded,
  setNotDueDataLoading,
  setAvailableYear,
  setItemAddStatus,
  deleteData,
  setPagination,
  setHasMoreData,
} = lendBorrowSlice.actions;
