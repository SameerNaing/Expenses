/** Data type for Login Request Body */
type LoginRequestBody = {
  email: string;
  password: string;
};

/** Data type for Logout Request Body */
type LogoutRequestBody = {
  userID: string;
  refreshToken: string;
};

/** Data type for Register Request Body */
type RegisterRequestBody = {
  username: string;
  email: string;
  password: string;
};

/** Data type for VerifyRegister and VerifyForgotPassword Request Body */
type VerifyRequestBody = {
  verificationCode: string;
};

/** Data type for forgot password Request body */
type ForgotPasswordRequestBody = {
  email: string;
};

/** Data type for reset password Request Body */
type ResetPasswordRequestBody = {
  newPassword: string;
};

/** Data type for Transaction Request Query */
type TransactionRequestQuery = {
  userID: string;
  month: number | string;
  year: string | number;
  category: string;
  pageNumber: number;
};

/** Delete Transacation Data Request Body */
type DeletTransactionDataRequestQuery = {
  userID: string;
  transactionID: string;
};

/** Add Transaction Request Body */
type AddTransactionRequestBody = {
  userID: string;
  note: string;
  date: string;
  category: string;
  amount: number;
};

/** Data type for update Transaction data request Body  */
type UpdateTransactionRequestBody = {
  userID: string;
  transactionID: string;
  note: string;
  date: string;
  category: string;
  amount: number;
};

/** Data type for Investment Request Query */
type InvestmentRequestQuery = {
  userID: string;
  month: string | number;
  year: string | number;
  status: string;
  pageNumber: number;
};

/** Data type for Add Investment Request Body */
type AddInvestmentRequestBody = {
  userID: string;
  investmentName: string;
  note: string;
  date: string;
  amount: number;
};

/** Data type for update Investment data request Body  */
type UpdateInvestmentRequestBody = {
  userID: string;
  investmentID: string;
  investmentName: string;
  note: string;
  date: string;
  amount: number;
  status: string;
  profitedAmount: number | null;
};

/** Data type for collect Investment request body */
type CollectInvestmentRequestBody = {
  userID: string;
  investmentID: string;
  isProfit: boolean;
  profitAmount: number | null | string;
};

/** Data type for delete Investment request body */
type DeleteInvesmentRequestQuery = {
  investmentID: string;
  userID: string;
};

/** Data type for Load All LendBorrow Data expect Due data request Query  */
type LendBorrowNotDueDataRequestQuery = {
  userID: string;
  month: string | number;
  year: string | number;
  category: string;
  pageNumber: number;
};

/** Data type for Load Due LendBorrow Data request query */
type LendBorrowDueDataRequestQuery = {
  userID: string;
};

/** Data type for add LendBorrow Data request body */
type AddLendBorrowRequestBody = {
  userID: string;
  note: string;
  date: string;
  dueDate: string;
  category: string;
  amount: number;
};

/** Data type for update LendBorrow Data request body */
type UpdateLendBorrowRequestBody = {
  userID: string;
  lendBorrowID: string;
  note: string;
  date: string;
  dueDate: string;
  category: string;
  status: string;
  amount: number;
};

/** Data type for collect lendBorrow request body */
type CollectLendBorrowRequestBody = {
  userID: string;
  lendBorrowID: string;
  category: string;
};

/** Data type for delete lendBorrow request Body  */
type DeleteLendBorrowRequestQuery = {
  userID: string;
  lendBorrowID: string;
};

/** Data type for Overview Page Data Request Query */
type OverviewPageDataRequest = {
  userID: string;
};
