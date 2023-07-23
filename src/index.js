import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";

import myReducer from "./reducers";
import mySaga from "./sagas";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({ myReducer }); //in case you have more than one reducer just comma seprate them here
const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(mySaga);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
