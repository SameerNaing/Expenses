import {
  pageLoaded,
  pageLoading,
  pageError,
  setItemAddStatus,
  setUpdateItemStatus,
  setCollectStatus,
  changeInvestmentStatus,
  updatedItem,
  availableYears,
  deleteData,
  setPagination,
  setHasMoreData,
} from "./investments-slice";
import { showSnackBar } from "../snackbar/snackbar-slice";

import UserModel from "../../models/userModel";
import api from "../../utils/api";
import { Status } from "../../constants/status";
import { PROFITED } from "../../constants/investmentStatus";

/** Action to load investment data when user enter the page */
const loadInvestmentsAction =
  (status: string, month: string | number, year: string | number) =>
  async (dispatch: Function) => {
    /** show loading spinner */
    dispatch(pageLoading());

    /** get userID from local storage via UserModel class */
    const userID: string = UserModel.get()!.userID;

    try {
      /** send request to get user's invesmtment data */
      const response = await api.getInvestments({
        userID,
        status,
        month,
        year,
        pageNumber: 1,
      });

      /** server response with investment data and available years for filter */
      const { data, distinctYears } = response.data;

      /** show investment data */
      dispatch(
        pageLoaded({
          investments: data,
          availableYears: distinctYears,
        })
      );
    } catch (e) {
      dispatch(pageError());
    }
  };

/** Action to add investment data */
const addInvestmentAction =
  (investmentName: string, amount: number, date: string, note: string) =>
  async (dispatch: Function) => {
    /** show loading */
    dispatch(setItemAddStatus(Status.Loading));

    /** get userID from local storage via UserModel class */
    const userID: string = UserModel.get()!.userID;
    try {
      /** post user entered investment to server */
      await api.addInvestment({
        userID,
        amount,
        date,
        note,
        investmentName,
      });

      /** set status to Loaded */
      dispatch(setItemAddStatus(Status.Loaded));
      /** show bottom snackbar */
      dispatch(showSnackBar({ isError: false, message: "Investment Added" }));
    } catch (e) {
      /** show bottom snackbar */
      dispatch(showSnackBar({ isError: true, message: "Unable to add" }));
      dispatch(setItemAddStatus(Status.Error));
    }
  };

/** Action to update user's investment data */
const updateInvestmentAction =
  (
    index: number,
    investmentID: string,
    investmentName: string,
    status: string,
    amount: number,
    date: string,
    note: string,
    profitedAmount: number | null
  ) =>
  async (dispatch: Function) => {
    /** show loading */
    dispatch(setUpdateItemStatus(Status.Loading));
    /** get userID from local storage via UserModel class */
    const userID = UserModel.get()!.userID;
    try {
      /** send updated investment data to server */
      const response = await api.updateInvestment({
        userID,
        investmentID,
        investmentName,
        status,
        amount,
        date,
        note,
        profitedAmount,
      });

      /** get available years for filter as a response from server */
      dispatch(availableYears(response.data.distinctYears));

      /** create new investment data */
      const updatedInvestment: InvestmentModel = {
        investmentID,
        investmentName,
        status,
        amount,
        date,
        note,
        profitedAmount: profitedAmount || 0,
      };

      /** update existing investment data in state */
      dispatch(updatedItem({ index, investment: updatedInvestment }));
      /** set status to Loaded */
      dispatch(setUpdateItemStatus(Status.Loaded));
      /** show bottom snackbar */
      dispatch(showSnackBar({ isError: false, message: "Updated" }));
    } catch (e) {
      /** show bottom snackbar */
      dispatch(showSnackBar({ isError: true, message: "Unable to Update" }));
      dispatch(setUpdateItemStatus(Status.Error));
    }
  };

/** Action to collect investment data */
const collectInvestmentAction =
  (investmentID: string, status: string, profitAmount: number | null) =>
  async (dispatch: Function) => {
    /** show loading */
    dispatch(setCollectStatus(Status.Loading));

    /** get userID from local storage via UserModel class */
    const userID: string = UserModel.get()!.userID;

    try {
      /** send to server */
      await api.collectInvestment({
        userID,
        investmentID,
        isProfit: status === PROFITED,
        profitAmount,
      });

      /** set data is collected in state */
      dispatch(
        changeInvestmentStatus({
          investmentStatus: status,
          investmentID,
          profitedAmount: profitAmount,
        })
      );
      /** set status to loaded */
      dispatch(setCollectStatus(Status.Loaded));
      /** show bottom snackbar */
      dispatch(showSnackBar({ isError: false, message: "Done" }));
    } catch (e) {
      /** show bottom snackbar */
      dispatch(
        showSnackBar({ isError: true, message: "Something went wrong" })
      );
      dispatch(setCollectStatus(Status.Error));
    }
  };

/** Action to delete Investment data */
const deleteInvestmentAction =
  (investmentID: string) => async (dispatch: Function) => {
    /** get userID from local storage via UserModel class */
    const userID: string = UserModel.get()!.userID;
    /** delete data from state */
    dispatch(deleteData({ investmentID }));
    try {
      /** send delete request */
      const response = await api.deleteInvestment({ userID, investmentID });
      /** set available year for filter */
      dispatch(availableYears(response.data.distinctYears));

      /** show bottom snack bar */
      dispatch(showSnackBar({ isError: false, message: "Deleted" }));
    } catch (e) {
      /** show bottom snack bar */
      dispatch(showSnackBar({ isError: true, message: "Unable to Delete" }));
    }
  };

/** Action to fetch paginate investment data */
const paginateAction =
  (
    status: string,
    month: number | string,
    year: string | number,
    pageNumber: number
  ) =>
  async (dispatch: Function) => {
    /** set pagination status to loading */
    dispatch(setPagination({ status: Status.Loading, investments: null }));
    /** get userID from local storage via UserModel class */
    const userID: string = UserModel.get()!.userID;

    try {
      /** get more data */
      const response = await api.getInvestments({
        status,
        month,
        year,
        userID,
        pageNumber,
      });
      const { data } = response.data;
      if (data.length === 0) {
        /** if response data length to 0 than stop pagination */
        dispatch(setHasMoreData(false));
        dispatch(setPagination({ status: Status.Initial, investments: null }));
      } else {
        dispatch(setPagination({ status: Status.Loaded, investments: data }));
      }
    } catch (e) {
      dispatch(setPagination({ status: Status.Error, investments: null }));
    }
  };

export {
  loadInvestmentsAction,
  addInvestmentAction,
  updateInvestmentAction,
  collectInvestmentAction,
  deleteInvestmentAction,
  paginateAction,
};
