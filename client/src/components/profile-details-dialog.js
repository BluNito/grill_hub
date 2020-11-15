import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const ProfileDetailsDialog = (props) => {
  const { open, handleClose, handleUpdate, user } = props;
  const [credentials, setCredentials] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setCredentials(user);
  }, [user]);

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
        </form>
      </div>
    </Dialog>
  );
};

export default ProfileDetailsDialog;
