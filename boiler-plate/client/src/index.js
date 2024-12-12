import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import "antd/dist/reset.css";
import { configureStore } from "@reduxjs/toolkit";
import promiseMiddleware from "redux-promise";
import Reducer from "./_reducers";

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = configureStore({
  reducer: Reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(promiseMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
