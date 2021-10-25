import {
  pageLoading,
  pageLoaded,
  pageError,
  setNotDueDataLoading,
  setAvailableYear,
  setItemAddStatus,
  deleteData,
  setPagination,
  setHasMoreData,
} from "./lendBorrow-slice";

import api from "../../utils/api";
import UserModel from "../../models/userModel";
import * as filters from "../../constants/filterConstants";
import { Status } from "../../constants/status";
import { showSnackBar } from "../snackbar/snackbar-slice";

/** Action to load LendBorrow data when user enter the page */
const loadLendBorrowPageDataAction = () => async (dispatch: Function) => {
  /** show loading spinner when user enter the page */
  dispatch(pageLoading());

  /** get userID from loaal storage via UserModel class */
  const userID: string = UserModel.get()!.userID;
  try {
    /** get not due data */
    const notDueDataResponse = await api.getNotDueLendBorrowData({
      userID,
      month: filters.ALL_MONTHS,
      year: filters.ALL_YEARS,
      category: filters.ALL_CATEGORIES,
      pageNumber: 1,
    });

    /** get due data */
    const dueDataResponse = await api.getDueLendBorrowData({ userID });

    const { lendBorrowData, distinctYears } = notDueDataResponse.data;
    const { dueData } = dueDataResponse.data;

    /** load fetched data to states */
    dispatch(
      pageLoaded({
        notDueData: lendBorrowData,
        dueData: dueData,
        availableYear: distinctYears,
      })
    );
  } catch (e) {
    dispatch(pageError());
  }
};

/** Load not due data Action when user changes filter */
const loadNotDueDataAction =
  (
    category: string,
    month: string | number,
    year: string | number,
    pageNumber: number
  ) =>
  async (dispatch: Function) => {
    /** show loading spinner when user change the filter */
    dispatch(setNotDueDataLoading({ isLoading: true, data: null }));
    /** get userID from local storage via UserModel class */
    const userID: string = UserModel.get()!.userID;
    try {
      /** get not due data */
      const response = await api.getNotDueLendBorrowData({
        userID,
        month,
        year,
        pageNumber,
        category,
      });

      /** server response with not due lendBorrow data and available years for filter */
      const { lendBorrowData, distinctYears } = response.data;

      dispatch(setAvailableYear(distinctYears));
      dispatch(
        setNotDueDataLoading({ isLoading: false, data: lendBorrowData })
      );
    } catch (e) {
      dispatch(setNotDueDataLoading({ isLoading: false, data: null }));
      dispatch(pageError());
    }
  };

/** Add Data Action */
const addLendBorrowDataAction =
  (
    note: string,
    date: string,
    dueDate: string,
    category: string,
    amount: number
  ) =>
  async (dispatch: Function) => {
    dispatch(setItemAddStatus(Status.Loading));
    const userID = UserModel.get()!.userID;
    try {
      await api.addLendBorrow({
        userID,
        note,
        date,
        dueDate,
        category,
        amount,
      });

      dispatch(setItemAddStatus(Status.Loaded));
      dispatch(showSnackBar({ isError: false, message: "Added" }));
    } catch (e) {
      dispatch(setItemAddStatus(Status.Error));
      dispatch(showSnackBar({ isError: true, message: "Unable to add Data" }));
    }
  };

/** collect lend borrow action */
const collectLendBorrowAction =
  (lendBorrowID: string, category: string) => async (dispatch: Function) => {
    const userID: string = UserModel.get()!.userID;

    try {
      await api.collectLendBorrow({ userID, lendBorrowID, category });
      dispatch(showSnackBar({ isError: false, message: "Done" }));

      dispatch(loadLendBorrowPageDataAction());
    } catch (e) {
      dispatch(
        showSnackBar({ isError: true, message: "Something went wrong!" })
      );
    }
  };

/** delete lend borrow action */
const deleteDataAction =
  (lendBorrowID: string, isDue: boolean) => async (dispatch: Function) => {
    const userID: string = UserModel.get()!.userID;
    try {
      const response = await api.deleteLendBorrow({ lendBorrowID, userID });
      dispatch(setAvailableYear(response.data.distinctYears));
      dispatch(deleteData({ lendBorrowID, isDue }));
      dispatch(showSnackBar({ isError: false, message: "Data Deleted" }));
    } catch (e) {
      dispatch(
        showSnackBar({ isError: true, message: "Unable to Delete Data" })
      );
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
    dispatch(setPagination({ status: Status.Loading, notDueData: null }));
    const userID: string = UserModel.get()!.userID;
    try {
      const response = await api.getNotDueLendBorrowData({
        category,
        month,
        year,
        userID,
        pageNumber,
      });

      const { lendBorrowData } = response.data;

      if (lendBorrowData.length === 0) {
        dispatch(setHasMoreData(false));
        dispatch(setPagination({ status: Status.Initial, notDueData: null }));
      } else {
        dispatch(
          setPagination({ status: Status.Loaded, notDueData: lendBorrowData })
        );
      }
    } catch (e) {
      dispatch(setPagination({ status: Status.Error, notDueData: null }));
    }
  };

export {
  loadLendBorrowPageDataAction,
  loadNotDueDataAction,
  addLendBorrowDataAction,
  collectLendBorrowAction,
  deleteDataAction,
  paginateAction,
};
