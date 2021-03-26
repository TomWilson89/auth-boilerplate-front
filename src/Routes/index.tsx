import React from "react";
import { Switch, Route } from "react-router-dom";

import RouteWithLayout from "../components/commons/Layout/RoutesWithLayout";
import MainLayout from "../components/commons/Layout/Main";

const LoginView = React.lazy(() => import("../views/Login"));

const Routes = () => {
  return (
    <Switch>
      {/* <RouteWithLayout Layout={MainLayout} Component={LoginView} /> */}
      <Route path="/login">
        <React.Suspense fallback={<div>Loading...</div>}>
          <LoginView />
        </React.Suspense>
      </Route>
    </Switch>
  );
};

export default Routes;
