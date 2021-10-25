import React, { Suspense } from "react";
import { Switch, Route } from "react-router";

import * as routes from "./constants/routeNameConstants";

import AuthorizedOnlyRoute from "./protectRoute/AuthorizedOnlyRoute";
import UnauthorizedOnlyRoute from "./protectRoute/UnauthorizedOnlyRoute";
import InitialRoute from "./protectRoute/InitialRoute";
import Navigation from "./components/UI/Navigation/Navigation";
import UserAccountBar from "./components/UI/UserAccountBar/UserAccountBar";
import PageStateProvider from "./context/PageStatesContext";
import BottomSnackBar from "./components/UI/Snackbar/BottomSnackBar";
import LogoutDialog from "./components/logout/LogoutDialog";
import PageLoading from "./components/UI/pageLoadingError/PageLoading";

const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage"));
const OverviewPage = React.lazy(() => import("./pages/OverviewPage"));
const ForgotPasswordPage = React.lazy(
  () => import("./pages/ForgotPasswordPage")
);
const VerifyEmailPage = React.lazy(() => import("./pages/VerifyEmailPage"));
const ResetPasswordPage = React.lazy(() => import("./pages/ResetPasswordPage"));
const TransactionsPage = React.lazy(() => import("./pages/TransactionsPage"));
const LendBorrowPage = React.lazy(() => import("./pages/LendBorrowPage"));
const InvestmentsPage = React.lazy(() => import("./pages/InvestmentsPage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));

function App() {
  return (
    <>
      <Navigation>
        <UserAccountBar />
        <PageStateProvider>
          <Suspense fallback={<PageLoading />}>
            <Switch>
              <InitialRoute exact path={routes.INITIAL_ROUTE} />
              <UnauthorizedOnlyRoute
                path={routes.LOGIN_ROUTE}
                component={LoginPage}
              />
              <UnauthorizedOnlyRoute
                path={routes.REGISTER_ROUTE}
                component={RegisterPage}
              />
              <UnauthorizedOnlyRoute
                path={routes.FORGOT_PASSWORD_ROUTE}
                component={ForgotPasswordPage}
              />
              <UnauthorizedOnlyRoute
                path={routes.VERIFY_EMAIL_ROUTE}
                component={VerifyEmailPage}
              />
              <UnauthorizedOnlyRoute
                path={routes.RESET_PASSWORD_ROUTE}
                component={ResetPasswordPage}
              />
              <AuthorizedOnlyRoute
                path={routes.OVERVIEW_ROUTE}
                component={OverviewPage}
              />
              <AuthorizedOnlyRoute
                path={routes.TRANSACTIONS_ROUTE}
                component={TransactionsPage}
              />
              <AuthorizedOnlyRoute
                path={routes.INVESTMENTS_ROUTE}
                component={InvestmentsPage}
              />
              <AuthorizedOnlyRoute
                path={routes.LENDBORROW_ROUTE}
                component={LendBorrowPage}
              />
              <Route path="*" component={NotFoundPage} />
            </Switch>
          </Suspense>
        </PageStateProvider>
      </Navigation>
      <LogoutDialog />
      <BottomSnackBar />
    </>
  );
}

export default App;
