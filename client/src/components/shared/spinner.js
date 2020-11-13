import { connect } from "react-redux";
import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Spinner = (props) => {
  return <CircularProgress />;
};

const mapStateToProps = (state) => ({
  colors: state.coms.colors,
});

export default connect(mapStateToProps, {})(Spinner);
