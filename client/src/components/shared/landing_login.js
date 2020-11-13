import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

const LandingLogin = ({ credentials, handleChange, errors, className }) => (
  <Grid container spacing={1} className={className}>
    <Grid item xs={12}>
      <TextField
        label="Email"
        placeholder="someone@somewhere.com"
        name="email"
        type="text"
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
  </Grid>
);

export default LandingLogin;
