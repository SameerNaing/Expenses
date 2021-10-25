import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Status } from "../../constants/status";
import { PROFITED } from "../../constants/investmentStatus";

interface InvestmentsState {
  /** page loading status */
  pageStatus: Status;
  /** available years for filter */
  availableYears: number[];
  /** investment data */
  investments: InvestmentModel[];
  /** adding item status */
  itemAddStatus: Status;
  /** updating item status */
  itemUpdateStatus: Status;
  /** collecting item status */
  collectStatus: Status;
  /** pagination status */
  paginationStatus: Status;
  /** more data to paginate */
  hasMoreData: boolean;
}

const initialState: InvestmentsState = {
  pageStatus: Status.Initial,
  availableYears: [],
  investments: [],
  itemAddStatus: Status.Initial,
  itemUpdateStatus: Status.Initial,
  collectStatus: Status.Initial,
  paginationStatus: Status.Initial,
  hasMoreData: true,
};

const investmentsSlice = createSlice({
  name: "investments",
  initialState,
  reducers: {
    pageLoaded: (
      state,
      action: PayloadAction<{
        investments: InvestmentModel[];
        availableYears: number[];
      }>
    ) => {
      const { investments, availableYears } = action.payload;
      state.investments = investments;
      state.availableYears = availableYears;
      state.pageStatus = Status.Loaded;
    },
    pageLoading: (state) => {
      state.pageStatus = Status.Loading;
    },
    pageError: (state) => {
      state.pageStatus = Status.Error;
    },
    availableYears: (state, action: PayloadAction<number[]>) => {
      state.availableYears = action.payload;
    },
    setItemAddStatus: (state, action: PayloadAction<Status>) => {
      state.itemAddStatus = action.payload;
    },
    setUpdateItemStatus: (state, action: PayloadAction<Status>) => {
      state.itemUpdateStatus = action.payload;
    },
    setCollectStatus: (state, action: PayloadAction<Status>) => {
      state.collectStatus = action.payload;
    },
    changeInvestmentStatus: (
      state,
      action: PayloadAction<{
        investmentStatus: string;
        investmentID: string;
        profitedAmount: number | null;
      }>
    ) => {
      const { investmentID, investmentStatus, profitedAmount } = action.payload;
      const index = state.investments.findIndex(
        (element) => element.investmentID === investmentID
      );
      state.investments[index].status = investmentStatus;
      if (investmentStatus === PROFITED) {
        state.investments[index].profitedAmount = profitedAmount!;
      }
    },
    updatedItem: (
      state,
      action: PayloadAction<{
        index: number;
        investment: InvestmentModel;
      }>
    ) => {
      const { index, investment } = action.payload;
      state.investments[index] = investment;
    },
    deleteData: (state, action: PayloadAction<{ investmentID: string }>) => {
      state.investments = state.investments.filter(
        (i) => i.investmentID !== action.payload.investmentID
      );
    },
    setPagination: (
      state,
      action: PayloadAction<{
        status: Status;
        investments: InvestmentModel[] | null;
      }>
    ) => {
      const { status } = action.payload;
      state.paginationStatus = status;
      if (status === Status.Loaded) {
        state.investments.push(...action.payload.investments!);
      }
    },
    setHasMoreData: (state, action: PayloadAction<boolean>) => {
      state.hasMoreData = action.payload;
    },
  },
});

export const {
  pageLoaded,
  pageLoading,
  pageError,
  availableYears,
  setItemAddStatus,
  setUpdateItemStatus,
  setCollectStatus,
  changeInvestmentStatus,
  updatedItem,
  deleteData,
  setPagination,
  setHasMoreData,
} = investmentsSlice.actions;

export default investmentsSlice.reducer;
