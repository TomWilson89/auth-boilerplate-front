import { AUTH } from "../../types";

type AuthType = {
  name: string;
  email: string;
  password: string;
};

type ActivateType = {
  token: string;
};

type GoogleLoginType = {
  idToken: string;
};

type FacebookLoginType = {
  accessToken: string;
  userID: string;
};

type ResetPasswordType = {
  password: string;
  token: string;
};

export const login = (data: Partial<AuthType>) => {
  return {
    type: AUTH.LOGIN_START,
    data,
  };
};

export const googleLogin = (data: GoogleLoginType) => {
  return {
    type: AUTH.GOOGLE_LOGIN_START,
    data,
  };
};

export const facebookLogin = (data: FacebookLoginType) => {
  return {
    type: AUTH.FACEBOOK_LOGIN_START,
    data,
  };
};

export const createAccount = (data: AuthType) => {
  return {
    type: AUTH.REGISTER_START,
    data,
  };
};

export const activateAccount = (data: ActivateType) => {
  return {
    type: AUTH.ACTIVATION_START,
    data,
  };
};

export const forgotPasssword = (data: Partial<AuthType>) => {
  return {
    type: AUTH.FORGOT_PASSWORD_START,
    data,
  };
};

export const resetPassword = (data: ResetPasswordType) => {
  return {
    type: AUTH.RESET_PASSWORD_START,
    data,
  };
};

export const clean = () => {
  return {
    type: AUTH.CLEAN_REDUCER,
  };
};
