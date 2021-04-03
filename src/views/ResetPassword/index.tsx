import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, useParams } from "react-router";

import logo from "../../assets/images/logo.png";
import { resetPassword } from "../../redux/actions";
import classes from "./styles.module.scss";
import { RootState } from "../../redux/models";
import Spinner from "../../components/commons/Spinner";
import { Helmet } from "react-helmet";

type FormData = {
  password: string;
  confirmPassword: string;
};

type Params = {
  token: string;
};

const schema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const ResetPassword: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useParams<Params>();

  const { isAuth, isLoading } = useSelector((state: RootState) => state.auth);

  const { register, handleSubmit, errors } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(({ password }) => {
    dispatch(resetPassword({ password, token }));
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
            Password
            <input name="password" type="password" ref={register} />
            <span> {errors.password?.message} </span>
          </label>
          <label>
            Confirm Password
            <input name="confirmPassword" type="password" ref={register} />
            <span> {errors.confirmPassword?.message} </span>
          </label>

          <div>
            {isLoading && <Spinner />}
            <button disabled={isLoading} type="submit">
              Send
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ResetPassword;
