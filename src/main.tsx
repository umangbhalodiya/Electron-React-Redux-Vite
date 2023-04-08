import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./samples/node-api";
import "./index.scss";
import { Provider } from "react-redux";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

postMessage({ payload: "removeLoading" }, "*");
