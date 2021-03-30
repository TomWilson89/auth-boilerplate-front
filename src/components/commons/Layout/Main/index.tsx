import React from "react";

import { Topbar } from "../../Navbar";

interface Props {
  children: React.ReactChild | React.ReactChildren;
}

const Main: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <React.Fragment>
      <Topbar />
      <main>{children}</main>
    </React.Fragment>
  );
};

export default Main;
