import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

const LandingRegister = ({ credentials, handleChange, errors, className }) => (
  <Grid container spacing={1} className={className}>
    <Grid item xs={12}>
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
    <Grid item xs={12}>
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
        placeholder="someone@somwhere.com"
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
        label="Password"
        placeholder="**********"
        name="password"
        type="password"
        value={credentials.password}
        onChange={handleChange}
        fullWidth={true}
        variant="outlined"
        error={!!errors.password}
        helperText={errors.password}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        label="Confirm Password"
        placeholder="**********"
        name="password2"
        type="password"
        value={credentials.password2}
        onChange={handleChange}
        fullWidth={true}
        variant="outlined"
        error={!!errors.password2}
        helperText={errors.password2}
      />
    </Grid>
  </Grid>
);

export default LandingRegister;
