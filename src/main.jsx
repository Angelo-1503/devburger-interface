import React from "react";
import ReactDom from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";


import { Router } from './routes'
import GlobalStyles from "./styles/globalStyles";
import AppProvider from "./hooks";
import stripePromise from "./config/stripeConfig";
import { ThemeProvider } from "styled-components";
import { standardTheme } from "./styles/themes/standard";

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={standardTheme}>
      <AppProvider>
        <Elements stripe={stripePromise}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </Elements>
        <GlobalStyles />
        <ToastContainer autoClose={2000} theme="dark" />
      </AppProvider>
    </ThemeProvider>
  </React.StrictMode>
);
