import React from "react";
import { Helmet } from "react-helmet";
import Logo from "../../components/commons/Logo";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>OHoney | Home</title>
      </Helmet>
      <Logo />
    </div>
  );
};

export default Home;
