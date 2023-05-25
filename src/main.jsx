import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.js";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";

const theme = createTheme({
  type: "light",
  theme: {
    colors: {
      success: "#208059",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <NextUIProvider theme={theme}>
        <App />
      </NextUIProvider>
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
