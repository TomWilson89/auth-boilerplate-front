import React from "react";
import { Route, Redirect } from "react-router-dom";

import ErrorBoundary from "../../error/ErrorBoundary";
import Logo from "../../Logo";

interface Props {
  Layout: React.FunctionComponent<any>;
  Component?: React.FunctionComponent<any>;
  isAuth: boolean;
  isLoading: boolean;
  exact: boolean;
  path: string;
}

const RouteWithLayout: React.FunctionComponent<Props> = (props) => {
  const { Layout, Component, isAuth, isLoading, exact, path, ...rest } = props;
  if (!isAuth) return <Redirect to="/login" />;
  if (isLoading) return <Logo />;
  return (
    <Route
      exact={exact}
      path={path}
      {...rest}
      render={(matchProps) => (
        <Layout>
          <React.Suspense fallback={<Logo />}>
            <ErrorBoundary>
              {Component && <Component {...matchProps} />}
            </ErrorBoundary>
          </React.Suspense>
        </Layout>
      )}
    />
  );
};

export default RouteWithLayout;
