import React from "react";
import { Link } from "react-router-dom";

import classes from "./styles.module.scss";
import logo from "../../../../assets/images/logo-light.png";

const routes = [
  { label: "Home", path: "/" },
  { label: "Blog", path: "/" },
  { label: "About", path: "/" },
  { label: "Contact", path: "/" },
];

const TopBar: React.FunctionComponent = () => {
  return (
    <div className={classes.Container}>
      <div className={classes.Navbar}>
        <img src={logo} alt="" />

        <div>
          <ul>
            {routes.map((route, i) => {
              return (
                <Link key={i} to={route.path}>
                  {route.label}
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
