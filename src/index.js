/**
 * Create React App entry point. This and `public/index.html` files can not be
 * changed or moved.
 */
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import * as _redux from "./redux";
import store, { persistor } from "./redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import App from "./app/App";
import "./index.scss";
import "./_wastelink/_assets/plugins/keenthemes-icons/font/ki.css";
import "socicon/css/socicon.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// import "bootstrap-daterangepicker/daterangepicker.css";
import "react-awesome-lightbox/build/style.css";
import "line-awesome/dist/line-awesome/css/line-awesome.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";

import {
  MetronicLayoutProvider,
  MetronicSplashScreenProvider,
} from "./_wastelink/layout";
import { MetronicI18nProvider } from "./_wastelink/i18n";

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const { PUBLIC_URL } = process.env;

/**
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 * basic Metronic mocks and returns it.
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */
// /* const mock = */ _redux.mockAxios(axios);

/**
 * Inject metronic interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
_redux.setupAxios(axios, store);

ReactDOM.render(
  <MetronicI18nProvider>
    <MetronicLayoutProvider>
      <MetronicSplashScreenProvider>
        <App store={store} basename={PUBLIC_URL} />
      </MetronicSplashScreenProvider>
    </MetronicLayoutProvider>
  </MetronicI18nProvider>,
  document.getElementById("root")
);
