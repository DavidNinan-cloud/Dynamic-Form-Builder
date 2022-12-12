import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./DashBoard/MainLayout/Layout";
import "./index.scss";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./store";
import { Provider } from "react-redux";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      tab: 1200,
      lg: 1260,
      xl: 1536,
    },
  },
});

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider theme={theme}>
        <div className="">
          <Layout />
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </ThemeProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <Provider store={store}>
    <StyledEngineProvider>
      <App />
    </StyledEngineProvider>
  </Provider>
);
