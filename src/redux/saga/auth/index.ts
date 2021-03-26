import { put, takeLatest, call } from "redux-saga/effects";
import { AnyAction } from "redux";

import { api, snackbar } from "../../../utils";

import { AUTH } from "../../types";

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

    yield snackbar(err);
  }
}

export function* logoutSaga() {
  try {
    yield put({ type: AUTH.LOGOUT_SUCCESS });
  } catch (err) {
    yield put({ type: AUTH.LOGOUT_FAILURE, payload: "Couldn't logout" });
  }
}

export default function* watchAuth() {
  yield takeLatest(AUTH.LOGIN_START, loginSaga);
  yield takeLatest(AUTH.LOGOUT_REQUEST, logoutSaga);
}
