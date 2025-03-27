import React from "react";
import ReactDom from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

import GlobalStyles from "./styles/globalStyles";

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <GlobalStyles />
    <ToastContainer autoClose={2000} theme="dark" />
  </React.StrictMode>
);
