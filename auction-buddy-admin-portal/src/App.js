import "./App.css";
import React, { Suspense, lazy } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import "react-toastify/dist/ReactToastify.css";

const Home = lazy(() => import("./Layouts/Home.js"));

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#0E0E0E",
      },
      secondary: {
        main: "#7A7A7A",
      },
      active: {
        main: "#ECECEC",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 768,
        md: 1000,
        lg: 1200,
        xl:1440
      },
    },
  });


  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        {/* <Container maxWidth="1920px"> */}

        <Router>
          <Home />
        </Router>

        {/* </Container> */}
      </Provider>
    </ThemeProvider>
  );
}

export default App;
