import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./login/login-slice";
import logoutReducer from "./logout/logout-slice";
import registerReducer from "./register/register-slice";
import verifyEmailReducer from "./verifyEmail/verifyEmail-slice";
import forgotPasswordReducer from "./forgotPassword/forgotPassword-slice";
import resetPasswordReducer from "./resetPassword/resetPassword-slice";
import transactionsReducer from "./transactions/transactions-slice";
import investmentReducer from "./investments/investments-slice";
import snackBarReducer from "./snackbar/snackbar-slice";
import lendBorrowReducer from "./lendBorrow/lendBorrow-slice";
import overviewReducer from "./overview/overview-slice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    logout: logoutReducer,
    register: registerReducer,
    verifyEmail: verifyEmailReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    transaction: transactionsReducer,
    investment: investmentReducer,
    snackbar: snackBarReducer,
    lendBorrow: lendBorrowReducer,
    overview: overviewReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
