import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Spinner from "./shared/spinner";

const ProfileDetailsDialog = (props) => {
  const { open, handleClose, handleUpdate, user, dimensions } = props;
  const [credentials, setCredentials] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [itemSize, setItemSize] = useState(6);

  useEffect(() => {
    setCredentials(user);
  }, [user]);

  useEffect(() => {
    if (dimensions.width < 500) setItemSize(12);
    else setItemSize(6);
  }, [dimensions]);

  const handleChange = (event) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const res = await handleUpdate(credentials);
    if (res) setErrors(res);
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Details</DialogTitle>
      <div className="dialog-form-container">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={itemSize}>
              <TextField
                label="First name"
                placeholder="Karen"
                name="fname"
                type="text"
                value={credentials.fname}
                onChange={handleChange}
                fullWidth={true}
                variant="outlined"
                error={!!errors.fname}
                helperText={errors.fname}
              />
            </Grid>
            <Grid item xs={itemSize}>
              <TextField
                label="Last name"
                placeholder="K"
                name="lname"
                type="text"
                value={credentials.lname}
                onChange={handleChange}
                fullWidth={true}
                variant="outlined"
                error={!!errors.lname}
                helperText={errors.lname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                placeholder="someone@somewhere.com"
                name="email"
                type="email"
                value={credentials.email}
                onChange={handleChange}
                fullWidth={true}
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contact"
                placeholder="1234567"
                name="contact"
                type="text"
                value={credentials.contact}
                onChange={handleChange}
                fullWidth={true}
                variant="outlined"
                error={!!errors.contact}
                helperText={errors.contact}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                multiline={true}
                placeholder="Where Am I"
                name="address"
                type="text"
                value={credentials.address}
                onChange={handleChange}
                fullWidth={true}
                variant="outlined"
                error={!!errors.address}
                helperText={errors.address}
              />
            </Grid>
            <Grid item xs={12}>
              {loading ? (
                <Spinner />
              ) : (
                <Button variant="contained" color="primary" type="submit">
                  Update
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </div>
    </Dialog>
  );
};
const mapStateToProps = (state) => ({
  dimensions: state.coms.dimensions,
});

export default connect(mapStateToProps, {})(ProfileDetailsDialog);
