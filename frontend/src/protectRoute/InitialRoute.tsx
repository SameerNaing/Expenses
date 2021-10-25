import { Route, Redirect } from "react-router-dom";

import * as routes from "../constants/routeNameConstants";
import UserModel from "../models/userModel";

interface Props {
  path: string;
  exact: boolean | undefined;
}

const InitialRoute: React.FC<Props> = ({ path, exact }) => {
  const user: UserModel | null = UserModel.get();

  return (
    <Route
      path={path}
      exact={exact}
      render={() =>
        user ? (
          <Redirect to={routes.OVERVIEW_ROUTE} />
        ) : (
          <Redirect to={routes.LOGIN_ROUTE} />
        )
      }
    />
  );
};

export default InitialRoute;
