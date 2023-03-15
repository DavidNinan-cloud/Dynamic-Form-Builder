import * as React from 'react'
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  Redirect,
  useLocation,
} from "react-router-dom";
import Body from './Drawer/Body';
import { ElementsContextProvider } from './DrawerContextApi/elementsContextArr';

import ReactDOM from "react-dom/client";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import store from "./store";
// import { Provider } from "react-redux";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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

function App() {
  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient} contextSharing={true}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <ThemeProvider theme={theme}>
    <ElementsContextProvider>
    <div>
      <Body />
    </div>
    </ElementsContextProvider>
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
}

export default App;
