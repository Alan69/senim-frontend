import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./page-layout.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd"; // Импорт ConfigProvider для кастомизации темы

import "./styles/style.css";
import store from "./redux/store.ts";
import theme from "./themeConfig"; // Импорт вашей темы
import "./global.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ConfigProvider theme={theme}>
          <App />
        </ConfigProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
