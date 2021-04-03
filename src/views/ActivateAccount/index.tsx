import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, useParams } from "react-router";

import logo from "../../assets/images/logo.png";
import { activateAccount } from "../../redux/actions";
import classes from "./styles.module.scss";
import { RootState } from "../../redux/models";
import Spinner from "../../components/commons/Spinner";
import { Helmet } from "react-helmet";

type Params = {
  token: string;
};

const ActivateAccount: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useParams<Params>();

  const { isAuth, isLoading } = useSelector((state: RootState) => state.auth);

  React.useEffect(() => {
    if (isAuth) {
      history.push("/");
    }
  }, [history, isAuth]);

  return (
    <main className={classes.Container}>
      <Helmet>
        <title>OHoney | Activate Account</title>
      </Helmet>
      <section className={classes.Card}>
        <ToastContainer
          className={classes.ToastContainer}
          newestOnTop
          progressClassName={classes.SnackbarProgress}
          toastClassName={classes.SnackbarContainer}
          autoClose={3000}
        />
        <img src={logo} alt="Logo" />

        <div>
          {isLoading && <Spinner />}
          <button
            disabled={isLoading}
            onClick={() => dispatch(activateAccount({ token }))}
          >
            Activate Your Account!
          </button>
        </div>
      </section>
    </main>
  );
};

export default ActivateAccount;
