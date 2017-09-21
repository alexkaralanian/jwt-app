import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./routes";
import store from "./store";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
