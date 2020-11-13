import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SplashScreen from "../../components/shared/splash";

const PublicRoute = ({
  component: Component,
  isAuthenticated,
  mainLoad,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      mainLoad ? (
        <SplashScreen />
      ) : isAuthenticated === false ? (
        <Component {...props} />
      ) : (
        <Redirect to="/home" />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  mainLoad: state.coms.mainLoad,
});

export default connect(mapStateToProps, {})(PublicRoute);
