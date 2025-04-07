import React from "react";
import ReactDom from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

import GlobalStyles from "./styles/globalStyles";
import AppProvider from "./hooks";

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
      <GlobalStyles />
      <ToastContainer autoClose={2000} theme="dark" />
    </AppProvider>
  </React.StrictMode>
);
