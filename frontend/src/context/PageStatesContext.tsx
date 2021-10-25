import React, { useContext, useState } from "react";

import * as investmentStatus from "../constants/investmentStatus";

/** Context API */
const PageStatesContext = React.createContext<PageStatesContextType | null>(
  null
);

/** context api as hook */
function usePageStates() {
  return useContext(PageStatesContext) as PageStatesContextType;
}

/** Input Field Values State for Add/Edit Data dialog */
const inputValuesInitState: InputValues = {
  investmentName: "",
  category: "",
  amount: null,
  profitedAmount: null,
  dueDate: "",
  date: "",
  note: "",
};

/** Detail Data State for bottom sheet in mobile and tablet view */
const dataDetailInitState: DataDetail = {
  name: "",
  note: "",
  date: "",
  dueDate: null,
  amount: 0,
  profitedAmount: 0,
  investmentStatus: "",
};

/** Context api Provider Wrapper,
 * stores Input Values State of Add/Edit Data dialog,
 * Add/Edit data dialog open/close state,
 * Update Index,
 * Data Index to update,
 * bottom sheet open/close state
 * and bottom sheet display data
 * */
const PageStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  /** state for input values */
  const [inputValues, setInputValues] =
    useState<InputValues>(inputValuesInitState);
  /** state for index of data to update */
  const [updateDataIndex, setUpdateDataIndex] = useState<number | null>(null);
  /** state for opne/close Add/Edit Dialgo */
  const [showDialog, setShowDialog] = useState<boolean>(false);
  /** state for open/close bottom sheet */
  const [showBottomSheet, setShowBottomSheet] = useState<boolean>(false);
  /** state for bottom sheet display data */
  const [dataDetail, setDataDetail] = useState<DataDetail>(dataDetailInitState);

  /** Function to execute when input value changes */
  const changeInputValues = (name: string, value: any) => {
    /** if input field name is 'amount' or 'profitedAmount' then parse to Int */
    if (name === "amount" || name === "profitedAmount") value = parseInt(value);
    setInputValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  /** function to open Add/Edit Dialog */
  const openDialog = () => setShowDialog(true);
  /** function to close Add/Edit Dialog */
  const closeDialog = () => {
    setUpdateDataIndex(null);
    setInputValues(inputValuesInitState);
    setShowDialog(false);
  };

  /** Function to open bottom sheet */
  const openBottomSheet = (detail: DataDetail) => {
    setDataDetail(detail);
    setShowBottomSheet(true);
  };
  /** Function to close bottom sheet */
  const closeBottomSheet = () => {
    setDataDetail(dataDetailInitState);
    setShowBottomSheet(false);
  };

  /** When update transaction values, load transaction data to input value state  */
  const setTransactionToInputValues = (transaction: TransactionModel) => {
    setInputValues((prev) => {
      return {
        ...prev,
        category: transaction.category,
        amount: transaction.amount,
        date: transaction.date,
        note: transaction.note,
      };
    });
  };

  /** When update investment values, load investment data to input value state  */
  const setInvestmentToInputValues = (investment: InvestmentModel) => {
    setInputValues((prev) => {
      return {
        ...prev,
        investmentName: investment.investmentName,
        amount: investment.amount,
        profitedAmount:
          investment.status === investmentStatus.PROFITED
            ? investment.profitedAmount
            : null,
        date: investment.date,
        note: investment.note,
      };
    });
  };

  /** when user leaves page set all context api states to initial */
  const setStatesToInit = () => {
    setInputValues(inputValuesInitState);
    setUpdateDataIndex(null);
    setShowDialog(false);
    setShowBottomSheet(false);
    setDataDetail(dataDetailInitState);
  };

  return (
    <PageStatesContext.Provider
      value={{
        inputValues,
        updateDataIndex,
        showDialog,
        showBottomSheet,
        dataDetail,
        changeInputValues,
        setUpdateDataIndex,
        openDialog,
        closeDialog,
        openBottomSheet,
        closeBottomSheet,
        setTransactionToInputValues,
        setInvestmentToInputValues,
        setStatesToInit,
      }}
    >
      {children}
    </PageStatesContext.Provider>
  );
};

export default PageStateProvider;
export { usePageStates };
