const { isEmpty, isEmail, isLength, isEqual } = require("../custom_validator");

const validateDishEntry = (data) => {
  let errors = {};
  if (isEmpty(data.name)) errors.name = "Name is required";
  if (isEmpty(data.price)) errors.price = "Price is required";
  if (isEmpty(data.type)) errors.type = "Type is required";
  if (isEmpty(data.desc)) errors.desc = "Description is required";
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const validateDishUpdate = (data) => {
  let errors = {};
  if (!isEmpty(data.email) && !isEmail(data.email))
    errors.email = "Invalid email";
  if (!isEmpty(data.password) && !isLength(data.password, { min: 6, max: 30 }))
    errors.password = "Password must be alteast 6 characters";
  if (!isEqual(data.password, data.confirm_password))
    errors.confirm_password = "Passwords must match";
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = {
  validateDishEntry,
  validateDishUpdate,
};
