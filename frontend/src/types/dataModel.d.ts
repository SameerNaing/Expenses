type TransactionModel = {
  note: string;
  date: string;
  category: string;
  amount: number;
  transactionID: string;
};

type InvestmentModel = {
  investmentName: string;
  note: string;
  date: string;
  status: string;
  amount: number;
  profitedAmount: number;
  investmentID: string;
};

type LendBorrowModel = {
  note: string;
  date: string;
  dueDate: string;
  category: string;
  status: string;
  amount: number;
  lendBorrowID: string;
};

type OverviewPageDataModel = {
  totalBalance: number;
  barChart: { labels: string[]; spent: number[]; income: number[] };
  donutChart: { spent: number; income: number };
  biggestExpenseCategory: { categoryName: string; amount: number }[];
};
