import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import classes from "./styles.module.scss";
import logo from "../../../../assets/images/logo-light.png";
import { AUTH } from "../../../../redux/types";
import { history } from "../../history";

const routes = [
  { label: "Home", path: "/" },
  { label: "Blog", path: "/" },
  { label: "About", path: "/" },
  { label: "Contact", path: "/" },
];

const TopBar: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  return (
    <div className={classes.Container}>
      <div className={classes.Navbar}>
        <img src={logo} alt="" onClick={() => history.push("/")} />

        <div>
          <ul>
            {routes.map((route, i) => {
              return (
                <Link key={i} to={route.path}>
                  {route.label}
                </Link>
              );
            })}
            <button onClick={() => dispatch({ type: AUTH.LOGOUT_REQUEST })}>
              Logout
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
