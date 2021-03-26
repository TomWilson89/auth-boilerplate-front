import { createStore, applyMiddleware, compose } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";

import rootReducer from "../reducers";
import rootSaga from "../saga";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const composeEnhacers =
  process.env.NODE_ENV === "development"
    ? (window && (window as any)).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const persistConfig = {
  key: "root",
  storage,
};

const persist = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persist,
  composeEnhacers(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);
