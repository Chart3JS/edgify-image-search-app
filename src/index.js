import React, { Suspense } from "react";
import 'babel-regenerator-runtime';
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import { createLogger } from "redux-logger";
import reducer from "./reducers";
import appSagas from './sagas';
import App from "@/app";
import LoadingPlaceholder from '@/loading-placeholder';

const sagas = createSagaMiddleware();
const middleware = [sagas, createLogger()];
const store = createStore(reducer, applyMiddleware(...middleware));
sagas.run(appSagas);
ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<LoadingPlaceholder />}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </Provider>,
  document.getElementById("root")
);