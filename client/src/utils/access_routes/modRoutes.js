import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SplashScreen from "../../components/shared/splash";
import { isMod } from "../user_clearance";

const ModRoute = ({
  component: Component,
  isAuthenticated,
  user,
  mainLoad,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      mainLoad ? (
        <SplashScreen />
      ) : isAuthenticated === true && isMod(user) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  mainLoad: state.coms.mainLoad,
});

export default connect(mapStateToProps, {})(ModRoute);
