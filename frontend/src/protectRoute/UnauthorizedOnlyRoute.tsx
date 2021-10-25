import React from "react";
import { Route, Redirect } from "react-router-dom";

import * as routes from "../constants/routeNameConstants";
import UserModel from "../models/userModel";

interface Props {
  component: React.ComponentType<any>;
  path: string;
}

const UnauthorizedOnlyRoute: React.FC<Props> = ({
  component: Component,
  path,
}) => {
  const user: UserModel | null = UserModel.get();

  return (
    <Route
      path={path}
      render={() =>
        !user ? <Component /> : <Redirect to={routes.OVERVIEW_ROUTE} />
      }
    />
  );
};

export default UnauthorizedOnlyRoute;
