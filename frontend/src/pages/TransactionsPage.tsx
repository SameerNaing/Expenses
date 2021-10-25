import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../store";
import { Status } from "../constants/status";
import monthsNameList from "../constants/monthsNameList";
import { categoriesList } from "../constants/categories";
import * as filterConstants from "../constants/filterConstants";
import getMonth from "../utils/getMonth";
import {
  loadTransactionsAction,
  addTransactionsAction,
  updateTransactionAction,
  deleteTransactionsAction,
  paginateAction,
} from "../store/transactions/transactions-actions";
import { setHasMoreData } from "../store/transactions/transactions-slice";
import useDataFilterHook from "../hooks/dataFiltersHook";
import { usePageStates } from "../context/PageStatesContext";
import usePagination from "../hooks/paginationHook";

import HeaderButton from "../components/UI/HeaderButton/HeaderButton";
import TransactionsDataTable from "../components/transactions/TransactionsDataTable";
import FiltersLayout from "../components/UI/FiltersLayout/FiltersLayout";
import Dropdown from "../components/UI/Dropdown/Dropdown";
import FloatingActionButton from "../components/UI/FloatingActionButton/FloatingActionButton";
import TransactionAddEditDialog from "../components/transactions/TransactionAddEditDialog";
import BottomSheetContainer from "../components/UI/DetailBottomSheet/BottomSheetContainer";
import PageLoading from "../components/UI/pageLoadingError/PageLoading";
import PageError from "../components/UI/pageLoadingError/PageError";

function TransactionsPage() {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.transaction);

  /** Redux States */
  const {
    pageStatus,
    availableYears,
    transactions,
    itemAddStatus,
    itemUpdateStatus,
    hasMoreData,
    paginationStatus,
  } = state;

  /** Filter Hook States */
  const {
    categoryFilterName,
    monthFilterName,
    yearFilterName,
    filters,
    changeFilter,
  } = useDataFilterHook();

  /** Page Context api states */
  const {
    showDialog,
    inputValues,
    updateDataIndex,
    showBottomSheet,
    dataDetail,
    openDialog,
    closeDialog,
    setStatesToInit,
    closeBottomSheet,
  } = usePageStates();

  /** Pagination Hook */
  const { ref, pageNumber, setPageNumber } = usePagination<HTMLDivElement>(
    hasMoreData,
    paginationStatus,
    pageStatus
  );

  /** Delete Data */
  const onDeleteDataHandler = (transactionID: string) =>
    dispatch(deleteTransactionsAction(transactionID));

  /** Update or Add Data */
  const onSave = () => {
    if (updateDataIndex !== null) {
      dispatch(
        updateTransactionAction(
          updateDataIndex,
          transactions[updateDataIndex].transactionID,
          inputValues.category,
          inputValues.amount!,
          inputValues.date,
          inputValues.note
        )
      );
    } else {
      dispatch(
        addTransactionsAction(
          inputValues.category,
          inputValues.amount!,
          inputValues.date,
          inputValues.note
        )
      );
    }
  };

  /** Reload page Data */
  const onPageReload = () =>
    dispatch(
      loadTransactionsAction(filters.category, filters.month, filters.year)
    );

  /** Reload Paginate Data */
  const onPaginationReload = () =>
    dispatch(
      paginateAction(filters.category, filters.month, filters.year, pageNumber)
    );

  const filterChangeHndler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    const args: [string, string | number, string | number] = ["", "", ""];
    args[0] = name === categoryFilterName ? value : filters.category;
    args[1] =
      name === monthFilterName ? getMonth(value) : getMonth(filters.month);
    args[2] = name === yearFilterName ? value : filters.year;

    changeFilter(e);
    dispatch(loadTransactionsAction(...args));
  };

  /** Track pageNumber of pagination */
  useEffect(() => {
    if (pageNumber !== 1) {
      dispatch(
        paginateAction(
          filters.category,
          filters.month,
          filters.year,
          pageNumber
        )
      );
    }
  }, [pageNumber]);

  /**
   * Track ItemAddStatus,
   * when item is added lifeCycle will dispatch action to reload the Transactions data
   */
  useEffect(() => {
    if (itemAddStatus === Status.Loaded) {
      closeDialog();
      dispatch(
        loadTransactionsAction(
          filters.category,
          getMonth(filters.month),
          filters.year
        )
      );
    }
    if (itemAddStatus === Status.Error) {
      closeDialog();
    }
  }, [itemAddStatus]);

  /**
   * Track ItemUpdateStatus,
   * when item is updated lifeCycle will close AddEditDialog
   */
  useEffect(() => {
    if (itemUpdateStatus === Status.Loaded) {
      closeDialog();
    }
  }, [itemUpdateStatus]);

  /** Load Transactions Data when page load and set PageStates to initial when user leaves this page */
  useEffect(() => {
    dispatch(
      loadTransactionsAction(filters.category, filters.month, filters.year)
    );
    return () => {
      setStatesToInit();
    };
  }, []);

  /** Track pageStatus
   * if pageload, filtervaluechange or itemAdd
   * set pageNumber to 1 and has more data to true
   */
  useEffect(() => {
    if (pageStatus === Status.Loaded) {
      setPageNumber(1);
      dispatch(setHasMoreData(true));
    }
  }, [pageStatus]);

  return (
    <>
      <HeaderButton
        showButton={pageStatus === Status.Loaded}
        headerText="Transactions"
        onClick={openDialog}
      />

      <FiltersLayout>
        <Dropdown
          disable={pageStatus !== Status.Loaded}
          name={categoryFilterName}
          value={filters.category}
          onChange={filterChangeHndler}
          options={[filterConstants.ALL_CATEGORIES, ...categoriesList]}
        />
        <Dropdown
          disable={pageStatus === Status.Loading || pageStatus === Status.Error}
          name={monthFilterName}
          value={filters.month}
          onChange={filterChangeHndler}
          options={[filterConstants.ALL_MONTHS, ...monthsNameList]}
        />
        <Dropdown
          disable={pageStatus === Status.Loading || pageStatus === Status.Error}
          name={yearFilterName}
          value={filters.year}
          onChange={filterChangeHndler}
          options={[filterConstants.ALL_YEARS, ...availableYears]}
        />
      </FiltersLayout>
      {pageStatus === Status.Loading && <PageLoading />}
      {pageStatus === Status.Error && <PageError onClick={onPageReload} />}

      {pageStatus === Status.Loaded && (
        <>
          <TransactionsDataTable
            transactions={transactions}
            onDelete={onDeleteDataHandler}
            marginBottom={
              paginationStatus === Status.Loading ||
              paginationStatus === Status.Error
                ? "12px"
                : null
            }
          />

          {paginationStatus === Status.Error && (
            <PageError
              marginBottom="100px"
              marginTop="30px"
              onClick={onPaginationReload}
            />
          )}

          {paginationStatus === Status.Loading && (
            <PageLoading marginBottom="100px" marginTop="2px" />
          )}
        </>
      )}
      <div ref={ref}></div>

      <FloatingActionButton onClick={openDialog} />

      <BottomSheetContainer
        name={dataDetail.name}
        amount={dataDetail.amount}
        date={dataDetail.date}
        note={dataDetail.note}
        onClose={closeBottomSheet}
        open={showBottomSheet}
      />

      {showDialog && (
        <TransactionAddEditDialog
          isLoading={
            itemAddStatus === Status.Loading ||
            itemUpdateStatus === Status.Loading
          }
          onSave={onSave}
        />
      )}
    </>
  );
}

export default TransactionsPage;
