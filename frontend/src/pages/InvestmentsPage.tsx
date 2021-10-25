import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../store";
import { Status } from "../constants/status";
import monthsNameList from "../constants/monthsNameList";
import { investmentStatusList } from "../constants/investmentStatus";
import * as filterConstants from "../constants/filterConstants";
import getMonth from "../utils/getMonth";
import {
  addInvestmentAction,
  loadInvestmentsAction,
  updateInvestmentAction,
  collectInvestmentAction,
  deleteInvestmentAction,
  paginateAction,
} from "../store/investments/investments-actions";
import { setHasMoreData } from "../store/investments/investments-slice";
import useDataFilterHook from "../hooks/dataFiltersHook";
import { usePageStates } from "../context/PageStatesContext";
import usePagination from "../hooks/paginationHook";

import HeaderButton from "../components/UI/HeaderButton/HeaderButton";
import FiltersLayout from "../components/UI/FiltersLayout/FiltersLayout";
import Dropdown from "../components/UI/Dropdown/Dropdown";
import InvestmentsDataTable from "../components/investments/InvestmentsDataTable";
import FloatingActionButton from "../components/UI/FloatingActionButton/FloatingActionButton";
import InvestmentAddEditDialog from "../components/investments/InvestmentAddEditDialog";
import BottomSheetContainer from "../components/UI/DetailBottomSheet/BottomSheetContainer";
import CollectInvestmentDialog from "../components/investments/CollectInvestmentDialog";
import PageLoading from "../components/UI/pageLoadingError/PageLoading";
import PageError from "../components/UI/pageLoadingError/PageError";

function InvestmentsPage() {
  const dispatch = useDispatch();

  const [collectID, setCollectID] = useState<string | null>(null);

  const state = useSelector((state: RootState) => state.investment);

  /** Reducer States */
  const {
    pageStatus,
    availableYears,
    investments,
    itemAddStatus,
    itemUpdateStatus,
    collectStatus,
    paginationStatus,
    hasMoreData,
  } = state;

  /** Filter Hook States */
  const {
    investmentFilterName,
    monthFilterName,
    yearFilterName,
    filters,
    changeFilter,
  } = useDataFilterHook();

  /** Page Context api States */
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

  /** Add or Update Data */
  const onSave = () => {
    if (updateDataIndex !== null) {
      dispatch(
        updateInvestmentAction(
          updateDataIndex,
          investments[updateDataIndex].investmentID,
          inputValues.investmentName,
          investments[updateDataIndex].status,
          inputValues.amount!,
          inputValues.date,
          inputValues.note,
          inputValues.profitedAmount
        )
      );
    } else {
      dispatch(
        addInvestmentAction(
          inputValues.investmentName,
          inputValues.amount!,
          inputValues.date,
          inputValues.note
        )
      );
    }
  };

  /** Reload Page Data */
  const onPageReload = () =>
    dispatch(
      loadInvestmentsAction(
        filters.investmentStatus,
        filters.month,
        filters.year
      )
    );

  /** Collect Data */
  const onCollect = (investmentStatus: string, profitedAmount: number | null) =>
    dispatch(
      collectInvestmentAction(collectID!, investmentStatus, profitedAmount)
    );

  /** Delete Data */
  const onDelete = (investmentID: string) =>
    dispatch(deleteInvestmentAction(investmentID));

  /** Reload Paginate Data */
  const onPaginationReload = () =>
    dispatch(
      paginateAction(
        filters.investmentStatus,
        filters.month,
        filters.year,
        pageNumber
      )
    );

  /** Load data when filter value changes */
  const filterChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    const args: [string, string | number, string | number] = ["", "", ""];

    args[0] = name === investmentFilterName ? value : filters.investmentStatus;
    args[1] =
      name === monthFilterName ? getMonth(value) : getMonth(filters.month);
    args[2] = name === yearFilterName ? value : filters.year;

    changeFilter(e);
    dispatch(loadInvestmentsAction(...args));
  };

  /** Track pageNumber of pagination */
  useEffect(() => {
    if (pageNumber !== 1) {
      dispatch(
        paginateAction(
          filters.investmentStatus,
          filters.month,
          filters.year,
          pageNumber
        )
      );
    }
  }, [pageNumber]);

  // /**
  //  * Track ItemAddStatus,
  //  * when item is added lifeCycle will dispatch action to reload the Transactions data
  //  */
  useEffect(() => {
    if (itemAddStatus === Status.Loaded) {
      closeDialog();
      dispatch(
        loadInvestmentsAction(
          filters.investmentStatus,
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

  /**
   * Track collectStatus
   * when collected lifeCycle will set collectID to null which will close collectInvestmentDialog
   */
  useEffect(() => {
    if (collectStatus === Status.Loaded) {
      setCollectID(null);
    }
  }, [collectStatus]);

  /**
   * load investment data when page load and setPageState (context api states) to initial when user leaves this page
   */
  useEffect(() => {
    dispatch(
      loadInvestmentsAction(
        filters.investmentStatus,
        filters.month,
        filters.year
      )
    );
    return () => {
      setStatesToInit();
    };
  }, []);

  /** Track pageStatus
   * if pageload, filtervaluechange, itemAdd or collectItem
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
        headerText="Investments"
        showButton={pageStatus === Status.Loaded}
        onClick={openDialog}
      />
      <FiltersLayout>
        <Dropdown
          disable={pageStatus !== Status.Loaded}
          name={investmentFilterName}
          value={filters.investmentStatus}
          onChange={filterChangeHandler}
          options={[filterConstants.ALL_STATUS, ...investmentStatusList]}
        />
        <Dropdown
          disable={pageStatus !== Status.Loaded}
          name={monthFilterName}
          value={filters.month}
          onChange={filterChangeHandler}
          options={[filterConstants.ALL_MONTHS, ...monthsNameList]}
        />
        <Dropdown
          disable={pageStatus !== Status.Loaded}
          name={yearFilterName}
          value={filters.year}
          onChange={filterChangeHandler}
          options={[filterConstants.ALL_YEARS, ...availableYears]}
        />
      </FiltersLayout>
      {pageStatus === Status.Loading && <PageLoading />}
      {pageStatus === Status.Error && <PageError onClick={onPageReload} />}

      {pageStatus === Status.Loaded && (
        <>
          <InvestmentsDataTable
            investments={investments}
            onDelete={onDelete}
            onCollect={(id) => setCollectID(id)}
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
        </>
      )}
      <div ref={ref}></div>

      <FloatingActionButton onClick={openDialog} />

      <BottomSheetContainer
        name={dataDetail.name}
        amount={dataDetail.amount}
        profitedAmount={dataDetail.profitedAmount}
        date={dataDetail.date}
        note={dataDetail.note}
        onClose={closeBottomSheet}
        open={showBottomSheet}
      />

      {showDialog && (
        <InvestmentAddEditDialog
          isLoading={
            itemAddStatus === Status.Loading ||
            itemUpdateStatus === Status.Loading
          }
          onSave={onSave}
        />
      )}
      {collectID !== null && (
        <CollectInvestmentDialog
          isLoading={collectStatus === Status.Loading}
          onDone={onCollect}
          onCancle={() => setCollectID(null)}
        />
      )}
    </>
  );
}

export default InvestmentsPage;
