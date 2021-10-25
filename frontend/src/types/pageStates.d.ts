interface InputValues {
  investmentName: string;
  category: string;
  amount: number | null;
  profitedAmount: number | null;
  date: string;
  dueDate: string | null;
  note: string;
}

interface DataDetail {
  name: string;
  note: string;
  date: string;
  dueDate: string | null;
  amount: number;
  profitedAmount: number | null;
  investmentStatus: string | null;
}

type PageStatesContextType = {
  inputValues: InputValues;
  updateDataIndex: number | null;
  showDialog: boolean;
  showBottomSheet: boolean;
  dataDetail: DataDetail;
  changeInputValues(name: string, value: any): void;
  setUpdateDataIndex(index: number): void;
  openDialog(): void;
  closeDialog(): void;
  openBottomSheet(detail: DataDetail): void;
  closeBottomSheet(): void;
  setTransactionToInputValues(transaction: TransactionModel): void;
  setInvestmentToInputValues(investment: InvestmentModel): void;
  setStatesToInit(): void;
};
