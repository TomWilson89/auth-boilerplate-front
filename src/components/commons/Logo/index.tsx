import React from "react";

import bee from "../../../assets/images/bee.png";
import logo from "../../../assets/images/logo.png";
import classes from "./styles.module.scss";

const Logo = () => {
  return (
    <div className={classes.Loader}>
      <img src={bee} alt="" className={classes.Bee} />
      <img src={logo} alt="" className={classes.Logo} />
    </div>
  );
};

export default Logo;
