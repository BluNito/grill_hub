import React from "react";
import Alert from "@material-ui/lab/Alert";

export const CenteredAlert = ({ content, severity }) => (
  <div className="centered-alert-container">
    <Alert severity={severity}>{content}</Alert>
  </div>
);
