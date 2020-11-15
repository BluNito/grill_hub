import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Header from "./shared/header";
import ProfileDetails from "./profile-details";
import ProfileOrders from "./profile-orders";

const Profile = (props) => {
  const { user, dimensions } = props;
  const [itemSize, setItemSize] = useState(6);

  useEffect(() => {
    if (dimensions.width > 800) setItemSize(6);
    else setItemSize(12);
  }, [dimensions]);

  return (
    <React.Fragment>
      <Header />
      <section className="profile-header">
        <img className="profile-picture" src={user.avatar} alt="avatar" />
        <div className="profile-name">{`${user.fname} ${user.lname}`}</div>
      </section>
      <div className="main-content">
        <Grid container spacing={1}>
          <Grid item xs={itemSize}>
            <ProfileDetails />
          </Grid>
          <Grid item xs={itemSize}>
            <ProfileOrders />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  dimensions: state.coms.dimensions,
});

export default connect(mapStateToProps, {})(Profile);
