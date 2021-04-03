import React from "react";
import { Switch, Route } from "react-router-dom";

import RouteWithLayout from "../components/commons/Layout/RoutesWithLayout";
import MainLayout from "../components/commons/Layout/Main";
import { RootState } from "../redux/models";
import { useSelector } from "react-redux";
import Logo from "../components/commons/Logo";

const LoginView = React.lazy(() => import("../views/Login"));

const RegisterView = React.lazy(() => import("../views/Register"));

const ForgotPasswordView = React.lazy(() => import("../views/ForgotPassword"));

const ResetPasswordView = React.lazy(() => import("../views/ResetPassword"));

const HomeView = React.lazy(() => import("../views/Home"));

const ActivateAccountView = React.lazy(
  () => import("../views/ActivateAccount")
);

const RoutesWithLayout = [
  {
    component: HomeView,
    path: "/",
  },
];

const Routes = () => {
  const { isAuth, isLoading } = useSelector((state: RootState) => state.auth);
  return (
    <Switch>
      <Route path="/login" exact>
        <React.Suspense fallback={<Logo />}>
          <LoginView />
        </React.Suspense>
      </Route>

      <Route path="/register" exact>
        <React.Suspense fallback={<Logo />}>
          <RegisterView />
        </React.Suspense>
      </Route>

      <Route path="/forgot-password" exact>
        <React.Suspense fallback={<Logo />}>
          <ForgotPasswordView />
        </React.Suspense>
      </Route>

      <Route path="/activate/:token" exact>
        <React.Suspense fallback={<Logo />}>
          <ActivateAccountView />
        </React.Suspense>
      </Route>

      <Route path="/reset/:token" exact>
        <React.Suspense fallback={<Logo />}>
          <ResetPasswordView />
        </React.Suspense>
      </Route>
      {RoutesWithLayout.map((page) => {
        return (
          <RouteWithLayout
            key={page.path}
            Layout={MainLayout}
            Component={page.component}
            isAuth={isAuth}
            isLoading={isLoading}
            exact={true}
            path={page.path}
          />
        );
      })}
    </Switch>
  );
};

export default Routes;
