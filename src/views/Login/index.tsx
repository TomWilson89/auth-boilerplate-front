import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Helmet from "react-helmet";

import logo from "../../assets/images/logo.png";
import { login } from "../../redux/actions";
import classes from "./styles.module.scss";
import { RootState } from "../../redux/models";
import { useHistory } from "react-router";
import Spinner from "../../components/commons/Spinner";
import { Link } from "react-router-dom";
import GoogleLoginButton from "../../components/GoogleLogin";
// import FacebookLoginButton from "../../components/FacebookLogin";

type FormData = {
  password: string;
  email: string;
};

const schema = yup.object().shape({
  email: yup.string().email("Email is not valid").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long"),
});

const Login: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isAuth, isLoading } = useSelector((state: RootState) => state.auth);

  const { register, handleSubmit, errors } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(({ email, password }) => {
    dispatch(login({ email, password }));
  });

  React.useEffect(() => {
    if (isAuth) {
      history.push("/");
    }
  }, [history, isAuth]);

  return (
    <main className={classes.Container}>
      <Helmet>
        <title>OHoney | Login</title>
      </Helmet>
      <section className={classes.Card}>
        <ToastContainer
          newestOnTop
          className={classes.ToastContainer}
          closeButton={false}
          progressClassName={classes.SnackbarProgress}
          toastClassName={classes.SnackbarContainer}
          autoClose={3000}
        />
        <img src={logo} alt="Logo" />

        <GoogleLoginButton />

        {/* <FacebookLoginButton /> */}

        <p>or</p>

        <h1 className={classes.Title}>Login with your email</h1>

        <form onSubmit={onSubmit}>
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
          <div>
            {isLoading && <Spinner />}
            <button disabled={isLoading} type="submit">
              Send
            </button>
          </div>
        </form>
        <Link to="/forgot-password">Forgot password?</Link>
        <Link to="/register">Don't have an account? Sign up here!</Link>
      </section>
    </main>
  );
};

export default Login;
