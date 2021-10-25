import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Status } from "../../constants/status";

interface TransactionsState {
  pageStatus: Status;
  availableYears: number[];
  transactions: TransactionModel[];
  itemAddStatus: Status;
  itemUpdateStatus: Status;
  paginationStatus: Status;
  hasMoreData: boolean;
}

const initialState: TransactionsState = {
  pageStatus: Status.Initial,
  availableYears: [],
  transactions: [],
  itemAddStatus: Status.Initial,
  itemUpdateStatus: Status.Initial,
  paginationStatus: Status.Loaded,
  hasMoreData: true,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    pageLoaded: (
      state,
      action: PayloadAction<{
        transactions: TransactionModel[];
        availableYears: number[];
      }>
    ) => {
      const { transactions, availableYears } = action.payload;
      state.transactions = transactions;
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
    updatedItem: (
      state,
      action: PayloadAction<{
        transactionID: string;
        category: string;
        amount: number;
        date: string;
        note: string;
        index: number;
      }>
    ) => {
      const { transactionID, category, amount, date, note, index } =
        action.payload;
      state.transactions[index] = {
        transactionID,
        category,
        amount,
        date,
        note,
      };
    },

    deleteData: (state, action: PayloadAction<{ transactionID: string }>) => {
      state.transactions = state.transactions.filter(
        (t) => t.transactionID !== action.payload.transactionID
      );
    },
    setPagination: (
      state,
      action: PayloadAction<{
        status: Status;
        transactions: TransactionModel[] | null;
      }>
    ) => {
      const { status } = action.payload;
      state.paginationStatus = status;
      if (status === Status.Loaded) {
        state.transactions.push(...action.payload.transactions!);
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
  updatedItem,
  deleteData,
  setPagination,
  setHasMoreData,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
