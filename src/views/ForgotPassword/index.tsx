import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import { forgotPasssword } from "../../redux/actions";
import classes from "./styles.module.scss";
import { RootState } from "../../redux/models";
import Spinner from "../../components/commons/Spinner";
import { Helmet } from "react-helmet";

type FormData = {
  email: string;
};

const schema = yup.object().shape({
  email: yup.string().email("Email is not valid").required("Email is required"),
});

const ForgotPassword: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isAuth, isLoading } = useSelector((state: RootState) => state.auth);

  const { register, handleSubmit, errors } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(forgotPasssword(data));
  });

  React.useEffect(() => {
    if (isAuth) {
      history.push("/");
    }
  }, [history, isAuth]);

  return (
    <main className={classes.Container}>
      <Helmet>
        <title>OHoney | Password Request</title>
      </Helmet>
      <section className={classes.Card}>
        <ToastContainer
          className={classes.ToastContainer}
          newestOnTop
          progressClassName={classes.SnackbarProgress}
          toastClassName={classes.SnackbarContainer}
          autoClose={5000}
        />
        <img src={logo} alt="Logo" />

        <h1 className={classes.Title}>Password Reset Request</h1>

        <form onSubmit={onSubmit}>
          <label>
            Email
            <input name="email" type="text" ref={register} />
            <span> {errors.email?.message} </span>
          </label>

          <div>
            {isLoading && <Spinner />}
            <button disabled={isLoading} type="submit">
              Send
            </button>
          </div>
        </form>
        <Link to="/login">Already have an account? Signin here!</Link>
      </section>
    </main>
  );
};

export default ForgotPassword;
