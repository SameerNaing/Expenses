import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import UserModel from "../models/userModel";
import { VERIFY_TOKEN } from "../constants/localStorageKeys";

const baseUrl = "http://localhost:8000";

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    /** get user data from local storage */
    const userData: UserModel | null = UserModel.get();
    /** get access token from local storage */
    const accessToken: string | null = userData && userData.accessToken;
    /** get verify token from local storage */
    const verifyToken: string | null = localStorage.getItem(VERIFY_TOKEN);

    /** if access token exists in local storage, then send it in header  */
    if (accessToken) {
      config.headers["authorization"] = `Bearer ${accessToken}`;
    }

    /** if verify token exists in local storage, then send it in header  */
    if (verifyToken) {
      config.data["authorization"] = `Bearer ${verifyToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const userData: UserModel | null = UserModel.get();
    const refreshToken: string | null = userData && userData.refreshToken;

    if (
      refreshToken &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const res = await axios.post(`${baseUrl}/auth/refreshToken`, {
        refreshToken,
        userID: userData!.userID,
      });

      if (res.status === 200) {
        userData!.accessToken = res.data.accessToken;
        userData!.save();
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

const api = {
  login: (body: LoginRequestBody) => axios.post(`${baseUrl}/auth/login`, body),
  logout: (body: LogoutRequestBody) =>
    axios.post(`${baseUrl}/auth/logout`, body),
  register: (body: RegisterRequestBody) =>
    axios.post(`${baseUrl}/auth/register`, body),
  verifyRegister: (body: VerifyRequestBody) =>
    axios.post(`${baseUrl}/auth/verifyRegister`, body),
  forgotPassword: (body: ForgotPasswordRequestBody) =>
    axios.post(`${baseUrl}/auth/forgotPassword`, body),
  verifyForgotPassword: (body: VerifyRequestBody) =>
    axios.post(`${baseUrl}/auth/verifyForgotPassword`, body),
  resetPassword: (body: ResetPasswordRequestBody) =>
    axios.post(`${baseUrl}/auth/resetPassword`, body),
  getTransactions: (query: TransactionRequestQuery) =>
    axios.get(`${baseUrl}/transactions/`, { params: query }),
  addTransaction: (body: AddTransactionRequestBody) =>
    axios.post(`${baseUrl}/transactions/add`, body),
  updateTransaction: (body: UpdateTransactionRequestBody) =>
    axios.put(`${baseUrl}/transactions/update`, body),
  deleteTransaction: (query: DeletTransactionDataRequestQuery) =>
    axios.delete(`${baseUrl}/transactions/delete`, { params: query }),
  getInvestments: (query: InvestmentRequestQuery) =>
    axios.get(`${baseUrl}/investments/`, { params: query }),
  addInvestment: (body: AddInvestmentRequestBody) =>
    axios.post(`${baseUrl}/investments/add`, body),
  updateInvestment: (body: UpdateInvestmentRequestBody) =>
    axios.put(`${baseUrl}/investments/update`, body),
  collectInvestment: (body: CollectInvestmentRequestBody) =>
    axios.post(`${baseUrl}/investments/collect`, body),
  deleteInvestment: (query: DeleteInvesmentRequestQuery) =>
    axios.delete(`${baseUrl}/investments/delete`, { params: query }),
  getNotDueLendBorrowData: (query: LendBorrowNotDueDataRequestQuery) =>
    axios.get(`${baseUrl}/lendBorrow/notDue`, { params: query }),
  getDueLendBorrowData: (query: LendBorrowDueDataRequestQuery) =>
    axios.get(`${baseUrl}/lendBorrow/due`, { params: query }),
  addLendBorrow: (body: AddLendBorrowRequestBody) =>
    axios.post(`${baseUrl}/lendBorrow/add`, body),
  updateLendBorrow: (body: UpdateLendBorrowRequestBody) =>
    axios.post(`${baseUrl}/lendBorrow/update`, body),
  collectLendBorrow: (body: CollectLendBorrowRequestBody) =>
    axios.post(`${baseUrl}/lendBorrow/collect`, body),
  deleteLendBorrow: (query: DeleteLendBorrowRequestQuery) =>
    axios.delete(`${baseUrl}/lendBorrow/delete`, { params: query }),
  totalBalance: (query: OverviewPageDataRequest) =>
    axios.get(`${baseUrl}/overview/totalBalance`, { params: query }),
  prevDatesSpentIncome: (query: OverviewPageDataRequest) =>
    axios.get(`${baseUrl}/overview/prevDatesSpentIncome`, { params: query }),
  todaySpentIncome: (query: OverviewPageDataRequest) =>
    axios.get(`${baseUrl}/overview/todaySpentIncome`, { params: query }),
  biggestExpenseCategory: (query: OverviewPageDataRequest) =>
    axios.get(`${baseUrl}/overview/biggestExpenseCategory`, { params: query }),
};

export default api;
