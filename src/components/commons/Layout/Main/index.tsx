import React from "react";

import { Topbar } from "../../Navbar";
import classes from "./styles.module.scss";

interface Props {
  children: React.ReactChild | React.ReactChildren;
}

const Main: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <React.Fragment>
      <Topbar />
      <main className={classes.Container}>{children}</main>
    </React.Fragment>
  );
};

export default Main;
