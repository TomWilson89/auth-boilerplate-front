import { AUTH } from "../../types";

type Login = {
  email: string;
  password: string;
};

export const login = (data: Login) => {
  return {
    type: AUTH.LOGIN_START,
    data,
  };
};

export const clean = () => {
  return {
    type: AUTH.CLEAN_REDUCER,
  };
};
