import { put, takeLatest, call } from "redux-saga/effects";
import { AnyAction } from "redux";

import { api, snackbarError, snackbarInfo } from "../../../utils";

import { AUTH } from "../../types";
import { history } from "../../../components/commons/history";

export function* loginSaga(action: AnyAction) {
  yield put({ type: AUTH.LOGIN_REQUEST });

  try {
    const { data } = yield call(api.post, "/auth/login", action.data);

    yield put({ type: AUTH.LOGIN_SUCCESS, payload: data.data });
  } catch (err) {
    yield put({
      type: AUTH.LOGIN_FAILURE,
      payload: err.response.data.error,
    });

    yield snackbarError(err);
  }
}

export function* googleLoginSaga(action: AnyAction) {
  yield put({ type: AUTH.GOOGLE_LOGIN_REQUEST });
  try {
    const { data } = yield call(api.post, "/auth/google-login", action.data);

    yield put({ type: AUTH.GOOGLE_LOGIN_SUCCESS, payload: data.data });
  } catch (err) {
    yield put({
      type: AUTH.GOOGLE_LOGIN_FAILURE,
      payload: err.response.data.error,
    });

    yield snackbarError(err);
  }
}

export function* facebookLoginSaga(action: AnyAction) {
  yield put({ type: AUTH.FACEBOOK_LOGIN_REQUEST });
  try {
    const { data } = yield call(api.post, "/auth/facebook-login", action.data);

    yield put({ type: AUTH.FACEBOOK_LOGIN_SUCCESS, payload: data.data });
  } catch (err) {
    yield put({
      type: AUTH.FACEBOOK_LOGIN_FAILURE,
      payload: err.response.data.error,
    });

    yield snackbarError(err);
  }
}

export function* registerSaga(action: AnyAction) {
  yield put({ type: AUTH.REGISTER_REQUEST });

  try {
    const { data } = yield call(api.post, "/auth/register", action.data);

    yield put({ type: AUTH.REGISTER_SUCCESS });

    yield snackbarInfo(data.data);
  } catch (err) {
    yield put({
      type: AUTH.REGISTER_FAILURE,
      payload: err.response.data.error,
    });

    yield snackbarError(err);
  }
}

export function* activationSaga(action: AnyAction) {
  yield put({ type: AUTH.ACTIVATION_REQUEST });

  try {
    const { data } = yield call(api.post, "/auth/activation", action.data);

    yield put({ type: AUTH.ACTIVATION_SUCCESS, payload: data.data });
  } catch (err) {
    yield put({
      type: AUTH.ACTIVATION_FAILURE,
      payload: err.response.data.error,
    });

    yield snackbarError(err);
  }
}

export function* forgotPasswordSaga(action: AnyAction) {
  yield put({ type: AUTH.FORGOT_PASSWORD_REQUEST });

  try {
    const { data } = yield call(api.post, "/auth/forgot-password", action.data);

    yield put({ type: AUTH.FORGOT_PASSWORD_SUCCESS });

    yield snackbarInfo(data.data);
  } catch (err) {
    yield put({
      type: AUTH.FORGOT_PASSWORD_FAILURE,
      payload: err.response.data.error,
    });

    yield snackbarError(err);
  }
}

export function* resetPasswordSaga(action: AnyAction) {
  yield put({ type: AUTH.RESET_PASSWORD_REQUEST });

  try {
    const { data } = yield call(api.post, "/auth/reset-password", action.data);

    yield put({ type: AUTH.RESET_PASSWORD_SUCCESS, payload: data.data });
  } catch (err) {
    yield put({
      type: AUTH.RESET_PASSWORD_FAILURE,
      payload: err.response.data.error,
    });

    yield snackbarError(err);
  }
}

export function* logoutSaga() {
  try {
    yield put({ type: AUTH.LOGOUT_SUCCESS });
    history.push("/login");
  } catch (err) {
    yield put({ type: AUTH.LOGOUT_FAILURE, payload: "Couldn't logout" });
  }
}

export default function* watchAuth() {
  yield takeLatest(AUTH.LOGIN_START, loginSaga);
  yield takeLatest(AUTH.GOOGLE_LOGIN_START, googleLoginSaga);
  yield takeLatest(AUTH.FACEBOOK_LOGIN_START, facebookLoginSaga);
  yield takeLatest(AUTH.REGISTER_START, registerSaga);
  yield takeLatest(AUTH.ACTIVATION_START, activationSaga);
  yield takeLatest(AUTH.FORGOT_PASSWORD_START, forgotPasswordSaga);
  yield takeLatest(AUTH.RESET_PASSWORD_START, resetPasswordSaga);
  yield takeLatest(AUTH.LOGOUT_REQUEST, logoutSaga);
}
