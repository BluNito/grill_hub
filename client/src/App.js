import React, { useEffect } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Cookies from "js-cookie";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import store from "./store/store";
import "./styles/styles.scss";

import Landing from "./components/index";
import Home from "./components/home";
import Cart from "./components/cart";
import Profile from "./components/profile";

import { autologin } from "./store/actions/authActions";
import PrivateRoute from "./utils/access_routes/privateRoute";
import PublicRoute from "./utils/access_routes/publicRoute";
import { mainLoad, setDimensions } from "./store/actions/comActions";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgb(233, 8, 8)",
    },
    secondary: {
      main: "rgb(243, 66, 12)",
    },
  },
});

const App = () => {
  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };
  useEffect(() => {
    console.log("Searching for cookies");
    let cookieData = Cookies.get("gh_creds");
    if (cookieData) {
      console.log("Found cookies!");
      store.dispatch(autologin(cookieData));
    } else {
      store.dispatch(mainLoad(false));
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      store.dispatch(setDimensions(getWindowDimensions()));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <PublicRoute exact path="/" component={Landing} />
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/cart" component={Cart} />
            <PrivateRoute exact path="/profile" component={Profile} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
