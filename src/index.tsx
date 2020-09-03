import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./assets/scss/Base.scss";
import "./assets/scss/icon.css";
import "./assets/scss/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import App from "./containers/App";
import createStore from "./redux/store/index";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import TagManager from "react-gtm-module";
import config from "./config";

// Configure Store
const store = createStore();
const tagManagerArgs = { gtmId: config.gtm_id };
// TagManager.initialize(tagManagerArgs);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();
