import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../store";
import { Status } from "../constants/status";
import monthsNameList from "../constants/monthsNameList";
import * as lendBorrowConsts from "../constants/lendBorrowConsts";
import * as filterConsts from "../constants/filterConstants";
import useDataFilterHook from "../hooks/dataFiltersHook";
import {
  loadLendBorrowPageDataAction,
  loadNotDueDataAction,
  addLendBorrowDataAction,
  deleteDataAction,
  collectLendBorrowAction,
  paginateAction,
} from "../store/lendBorrow/lendBorrow-actions";
import { setHasMoreData } from "../store/lendBorrow/lendBorrow-slice";
import { usePageStates } from "../context/PageStatesContext";
import getMonth from "../utils/getMonth";
import usePagination from "../hooks/paginationHook";

import HeaderButton from "../components/UI/HeaderButton/HeaderButton";
import FiltersLayout from "../components/UI/FiltersLayout/FiltersLayout";
import Dropdown from "../components/UI/Dropdown/Dropdown";
import Title from "../components/lendBorrow/Title";
import LendBorrowDataTable from "../components/lendBorrow/LendBorrowDataTable";
import FloatingActionButton from "../components/UI/FloatingActionButton/FloatingActionButton";
import LendBorrowAddEditDialog from "../components/lendBorrow/LendBorrowAddDialog";
import BottomSheetContainer from "../components/UI/DetailBottomSheet/BottomSheetContainer";
import PageError from "../components/UI/pageLoadingError/PageError";
import PageLoading from "../components/UI/pageLoadingError/PageLoading";

function LendBorrowPage() {
  const dispatch = useDispatch();
  const states = useSelector((state: RootState) => state.lendBorrow);

  /** Redux States */
  const {
    pageStatus,
    notDueLendBorrowData,
    dueLendBorrowData,
    availableYears,
    isNotDueDataLoading,
    itemAddStatus,
    updateItemStatus,
    hasMoreData,
    paginationStatus,
  } = states;

  /** Filter Hook States */
  const {
    categoryFilterName,
    monthFilterName,
    yearFilterName,
    filters,
    changeFilter,
  } = useDataFilterHook();

  /** Page Context api States */
  const {
    showDialog,
    inputValues,
    showBottomSheet,
    dataDetail,
    openDialog,
    closeDialog,
    setStatesToInit,
    closeBottomSheet,
  } = usePageStates();

  /** Add Data */
  const onSave = () => {
    dispatch(
      addLendBorrowDataAction(
        inputValues.note,
        inputValues.date,
        inputValues.dueDate!,
        inputValues.category,
        inputValues.amount!
      )
    );
  };

  /** Pagination Hook */
  const { ref, pageNumber, setPageNumber } = usePagination<HTMLDivElement>(
    hasMoreData,
    paginationStatus,
    pageStatus,
    isNotDueDataLoading
  );

  /** Load not-due data when filter value changes */
  const filtersChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    const args: [string, string | number, string | number] = ["", "", ""];

    args[0] = name === categoryFilterName ? value : filters.category;
    args[1] =
      name === monthFilterName ? getMonth(value) : getMonth(filters.month);
    args[2] = name === yearFilterName ? value : filters.year;

    changeFilter(e);
    dispatch(loadNotDueDataAction(...args, 1));
  };

  /** Delete Data */
  const onDelete = (lendBorrowID: string, isDue: boolean) =>
    dispatch(deleteDataAction(lendBorrowID, isDue));

  /** Reload Paginate Data */
  const onPaginationReload = () =>
    dispatch(
      paginateAction(filters.category, filters.month, filters.year, pageNumber)
    );

  /** Collect Data */
  const onCollect = (lendBorrowID: string, category: string) =>
    dispatch(collectLendBorrowAction(lendBorrowID, category));

  /** Reload Page */
  const onReloadPage = () => dispatch(loadLendBorrowPageDataAction());

  /** Load both due and not-due Data when page load and setPagesStates to init when user leave this page */
  useEffect(() => {
    dispatch(loadLendBorrowPageDataAction());
    return () => {
      setStatesToInit();
    };
  }, []);

  /** Track item Add status */
  useEffect(() => {
    if (itemAddStatus === Status.Loaded) {
      closeDialog();
      dispatch(loadLendBorrowPageDataAction());
    }
  }, [itemAddStatus]);

  /** Track item Update status */
  useEffect(() => {
    if (updateItemStatus === Status.Loaded) {
      closeDialog();
      dispatch(loadLendBorrowPageDataAction());
    }
  }, [updateItemStatus]);

  /** track pageStatus and isNotDueDataLoading
   * if pageload, filtervaluechange, itemAdd or collectItem
   * set pageNumber to 1 and has more data to true
   */
  useEffect(() => {
    if (pageStatus === Status.Loaded && !isNotDueDataLoading) {
      setPageNumber(1);
      dispatch(setHasMoreData(true));
    }
  }, [pageStatus, isNotDueDataLoading]);

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

  return (
    <>
      <HeaderButton
        headerText="Lend/Borrow"
        onClick={openDialog}
        showButton={pageStatus === Status.Loaded}
      />
      {pageStatus === Status.Loading && <PageLoading />}
      {pageStatus === Status.Error && <PageError onClick={onReloadPage} />}

      {pageStatus === Status.Loaded && (
        <>
          <Title title="Due" />
          <LendBorrowDataTable
            isDue={true}
            onCollect={onCollect}
            onDelete={onDelete}
            marginBottom="40px"
            data={dueLendBorrowData}
          />
          <Title title="All" />
          <FiltersLayout>
            <Dropdown
              options={[
                filterConsts.ALL_CATEGORIES,
                lendBorrowConsts.LEND_CAT,
                lendBorrowConsts.BORROW_CAT,
              ]}
              onChange={filtersChangeHandler}
              name={categoryFilterName}
              value={filters.category}
              disable={isNotDueDataLoading}
            />
            <Dropdown
              disable={isNotDueDataLoading}
              name={monthFilterName}
              value={filters.month}
              onChange={filtersChangeHandler}
              options={[filterConsts.ALL_MONTHS, ...monthsNameList]}
            />
            <Dropdown
              disable={isNotDueDataLoading}
              name={yearFilterName}
              value={filters.year}
              onChange={filtersChangeHandler}
              options={[filterConsts.ALL_YEARS, ...availableYears]}
            />
          </FiltersLayout>
          <LendBorrowDataTable
            isDue={false}
            onCollect={onCollect}
            onDelete={onDelete}
            data={notDueLendBorrowData}
            marginBottom={
              paginationStatus === Status.Loading ||
              paginationStatus === Status.Error
                ? "12px"
                : ""
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
          <FloatingActionButton onClick={openDialog} />
        </>
      )}
      <div ref={ref}></div>

      <BottomSheetContainer
        name={dataDetail.name}
        amount={dataDetail.amount}
        profitedAmount={dataDetail.profitedAmount}
        date={dataDetail.date}
        dueDate={dataDetail.dueDate}
        note={dataDetail.note}
        onClose={closeBottomSheet}
        open={showBottomSheet}
      />
      {showDialog && (
        <LendBorrowAddEditDialog
          isLoading={itemAddStatus === Status.Loading}
          onSave={onSave}
        />
      )}
    </>
  );
}

export default LendBorrowPage;
