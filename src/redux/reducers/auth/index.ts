import { AnyAction } from "redux";

import { AUTH } from "../../types";
import { AuthState } from "./auth.state";

const initialUser = {
  createdAt: null,
  deletedAt: null,
  updatedAt: null,
  email: "",
  name: "",
  resetPasswordExpire: null,
  resetPasswordToken: null,
  _id: "",
};

const initialState: AuthState = {
  error: null,
  isAuth: false,
  isLoading: false,
  accessToken: "",
  success: false,
  user: initialUser,
};

export const reducer = (state = initialState, action: AnyAction): AuthState => {
  const { type, payload } = action;
  switch (type) {
    case AUTH.CLEAN_REDUCER:
      return {
        ...state,
        isLoading: false,
        accessToken: "",
        success: false,
        isAuth: false,
      };

    case AUTH.LOGIN_REQUEST:
    case AUTH.LOAD_USER_REQUEST:
    case AUTH.FORGOT_PASSWORD_REQUEST:
    case AUTH.RESET_PASSWORD_REQUEST:
    case AUTH.REGISTER_START:
    case AUTH.ACTIVATION_REQUEST:
    case AUTH.GOOGLE_LOGIN_REQUEST:
    case AUTH.FACEBOOK_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: false,
      };

    case AUTH.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };

    case AUTH.LOGIN_SUCCESS:
    case AUTH.GOOGLE_LOGIN_SUCCESS:
    case AUTH.FACEBOOK_LOGIN_SUCCESS:
    case AUTH.RESET_PASSWORD_SUCCESS:
    case AUTH.ACTIVATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        isAuth: true,
        accessToken: payload,
      };

    case AUTH.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        success: true,
      };

    case AUTH.LOAD_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: payload,
        error: null,
        isAuth: true,
      };

    case AUTH.LOGIN_FAILURE:
    case AUTH.GOOGLE_LOGIN_FAILURE:
    case AUTH.FACEBOOK_LOGIN_FAILURE:
    case AUTH.LOAD_USER_FAILURE:
    case AUTH.REGISTER_FAILURE:
    case AUTH.ACTIVATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
        user: initialUser,
        isAuth: false,
        accessToken: "",
        success: false,
      };

    case AUTH.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        accessToken: "",
        user: initialUser,
      };

    case AUTH.LOGOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
        isAuth: false,
        user: initialUser,
      };

    case AUTH.FORGOT_PASSWORD_FAILURE:
    case AUTH.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
        success: false,
      };

    default:
      return state;
  }
};
