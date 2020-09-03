import { applyMiddleware, createStore as createStoreFromRedux } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducers";
import rootSaga from "../sagas";
import { noNetworkMiddleware } from "./middlewares";
import { defaultConst } from "../actions/default";

export default function createStore() {
  const sagaMiddleware = createSagaMiddleware();

  const middleware =
    process.env.NODE_ENV === "development"
      ? composeWithDevTools(
          applyMiddleware(
            noNetworkMiddleware(defaultConst.NETWORK_UPDATE),
            sagaMiddleware
          )
        )
      : applyMiddleware(
          noNetworkMiddleware(defaultConst.NETWORK_UPDATE),
          sagaMiddleware
        );

  const store = createStoreFromRedux(rootReducer, middleware);
  sagaMiddleware.run(rootSaga);

  return store;
}
