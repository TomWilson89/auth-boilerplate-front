import React from "react";
import { Route, Redirect } from "react-router-dom";

import ErrorBoundary from "../../error/ErrorBoundary";
import classes from "./styles.module.scss";

interface Props {
  Layout: React.FunctionComponent<any>;
  Component?: React.FunctionComponent<any>;
}

const RouteWithLayout: React.FunctionComponent<Props> = (props) => {
  const { Layout, Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Layout>
          <React.Suspense fallback={<div>Loading...</div>}>
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
