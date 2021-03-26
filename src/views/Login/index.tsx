import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logo from "../../assets/images/logo.png";
import { login } from "../../redux/actions";
import classes from "./styles.module.scss";
import { RootState } from "../../redux/models";
import { useHistory } from "react-router";
import Spinner from "../../components/commons/Spinner";

type FormData = {
  password: string;
  email: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
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
    <div className={classes.Card}>
      <ToastContainer
        closeButton={false}
        progressClassName={classes.SnackbarProgress}
        toastClassName={classes.SnackbarContainer}
        autoClose={3000}
      />
      <img src={logo} alt="Logo" />

      <h1 className={classes.Title}>Login</h1>

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
    </div>
  );
};

export default Login;
