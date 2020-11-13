import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SplashScreen from "../../components/shared/splash";

const PrivateRoute = ({
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
      ) : isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  mainLoad: state.coms.mainLoad,
});

export default connect(mapStateToProps, {})(PrivateRoute);
