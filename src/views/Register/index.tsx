import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logo from "../../assets/images/logo.png";
import { createAccount } from "../../redux/actions";
import classes from "./styles.module.scss";
import { RootState } from "../../redux/models";
import { useHistory } from "react-router";
import Spinner from "../../components/commons/Spinner";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

type FormData = {
  password: string;
  email: string;
  name: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters long")
    .max(32, "Name must be at most 32 characters long"),
  email: yup.string().email("Email is not valid").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Register: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isAuth, isLoading } = useSelector((state: RootState) => state.auth);

  const { register, handleSubmit, errors } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(createAccount(data));
  });

  React.useEffect(() => {
    if (isAuth) {
      history.push("/");
    }
  }, [history, isAuth]);

  return (
    <main className={classes.Container}>
      <Helmet>
        <title>OHoney | Create Account</title>
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

        <h1 className={classes.Title}>Create account</h1>

        <form onSubmit={onSubmit}>
          <label>
            Name
            <input name="name" type="text" ref={register} />
            <span> {errors.name?.message} </span>
          </label>

          <label>
            Email
            <input name="email" type="text" ref={register} />
            <span> {errors.email?.message} </span>
          </label>

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
        <Link to="/login">Already have an account? Sign in here!</Link>
      </section>
    </main>
  );
};

export default Register;
