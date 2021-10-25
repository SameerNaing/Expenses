import {
  pageLoaded,
  pageLoading,
  pageError,
  setItemAddStatus,
  setUpdateItemStatus,
  updatedItem,
  deleteData,
  availableYears,
  setPagination,
  setHasMoreData,
} from "./transactions-slice";

import UserModel from "../../models/userModel";
import api from "../../utils/api";
import { Status } from "../../constants/status";
import { showSnackBar } from "../snackbar/snackbar-slice";

/** Action to load transactions data when user enter the page */
const loadTransactionsAction =
  (category: string, month: number | string, year: string | number) =>
  async (dispatch: Function) => {
    /** show loading spinner */
    dispatch(pageLoading());

    /** get userID from local storage via UserModel class */
    const userID: string = UserModel.get()!.userID;

    try {
      /** send request to get user's transactions data */
      const response = await api.getTransactions({
        userID,
        category,
        month,
        year,
        pageNumber: 1,
      });

      /** server response with transactions data and available years for filter */
      const { data, distinctYears } = response.data;

      /** show transactions data */
      dispatch(
        pageLoaded({
          transactions: data,
          availableYears: distinctYears,
        })
      );
    } catch (e) {
      dispatch(pageError());
    }
  };

/** Action to add transaction data */
const addTransactionsAction =
  (category: string, amount: number, date: string, note: string) =>
  async (dispatch: Function) => {
    /** show loading */
    dispatch(setItemAddStatus(Status.Loading));

    /** get userID from local storage via UserModel class */
    const userID: string = UserModel.get()!.userID;
    try {
      await api.addTransaction({ userID, category, amount, date, note });
      dispatch(setItemAddStatus(Status.Loaded));
      dispatch(showSnackBar({ isError: false, message: "Transaction Added" }));
    } catch (e) {
      dispatch(showSnackBar({ isError: false, message: "Unable to Add" }));
      dispatch(setItemAddStatus(Status.Error));
    }
  };

/** update transaction data action */
const updateTransactionAction =
  (
    index: number,
    transactionID: string,
    category: string,
    amount: number,
    date: string,
    note: string
  ) =>
  async (dispatch: Function) => {
    dispatch(setUpdateItemStatus(Status.Loading));

    const userID = UserModel.get()!.userID;
    try {
      const response = await api.updateTransaction({
        transactionID,
        userID,
        category,
        amount,
        date,
        note,
      });

      dispatch(availableYears(response.data.distinctYears));
      dispatch(
        updatedItem({ transactionID, category, amount, date, note, index })
      );
      dispatch(setUpdateItemStatus(Status.Loaded));
      dispatch(showSnackBar({ isError: false, message: "Updated" }));
    } catch (e) {
      dispatch(showSnackBar({ isError: true, message: "Unable to Update" }));
      dispatch(setUpdateItemStatus(Status.Error));
    }
  };

/** delete transaction action */
const deleteTransactionsAction =
  (transactionID: string) => async (dispatch: Function) => {
    const userID: string = UserModel.get()!.userID;
    try {
      const response = await api.deleteTransaction({ transactionID, userID });
      dispatch(deleteData({ transactionID }));
      dispatch(availableYears(response.data.distinctYears));
      dispatch(showSnackBar({ isError: false, message: "Deleted" }));
    } catch (e) {
      dispatch(showSnackBar({ isError: true, message: "Unable to delete" }));
    }
  };

/** pagination action */
const paginateAction =
  (
    category: string,
    month: number | string,
    year: string | number,
    pageNumber: number
  ) =>
  async (dispatch: Function) => {
    dispatch(setPagination({ status: Status.Loading, transactions: null }));
    const userID: string = UserModel.get()!.userID;
    try {
      const response = await api.getTransactions({
        category,
        month,
        year,
        userID,
        pageNumber,
      });

      const { data } = response.data;

      if (data.length === 0) {
        dispatch(setHasMoreData(false));
        dispatch(setPagination({ status: Status.Initial, transactions: null }));
      } else {
        dispatch(setPagination({ status: Status.Loaded, transactions: data }));
      }
    } catch (e) {
      dispatch(setPagination({ status: Status.Error, transactions: null }));
    }
  };

export {
  loadTransactionsAction,
  addTransactionsAction,
  updateTransactionAction,
  deleteTransactionsAction,
  paginateAction,
};
