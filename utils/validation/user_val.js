const { isEmpty, isEmail, isLength, isEqual } = require("../custom_validator");

const validateRegisterInput = (data) => {
  let errors = {};
  if (isEmpty(data.fname)) errors.fname = "First name is required";
  if (isEmpty(data.lname)) errors.lname = "Last name is required";
  if (isEmpty(data.email)) errors.email = "Email is required";
  if (!isEmail(data.email)) errors.email = "Invalid email";
  if (!isLength(data.password, { min: 6, max: 30 }))
    errors.password = "Password must be alteast 6 characters";
  if (isEmpty(data.password)) errors.password = "Password is required";
  if (!isEqual(data.password, data.confirm_password))
    errors.confirm_password = "Passwords must match";
  if (isEmpty(data.confirm_password))
    errors.confirm_password = "Confirm password is required";

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const validateLoginInput = (data) => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = "Email is required";
  if (!isLength(data.password, { min: 6, max: 30 }))
    errors.password = "Password must be alteast 6 characters";
  if (isEmpty(data.password)) errors.password = "Password is required";

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = {
  validateRegisterInput,
  validateLoginInput,
};
