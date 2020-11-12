const { isEmpty, isEmail, isLength, isEqual } = require("../custom_validator");

const validateOrderCreate = (data) => {
  let errors = {};
  if (isEmpty(data)) errors.cart = "Cart is empty";
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = {
  validateOrderCreate,
};
