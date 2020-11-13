const { isEmpty, isEmail, isLength, isEqual } = require("../custom_validator");

const validateCartAdd = (data) => {
  let errors = {};
  if (!data.quantity || data.quantity < 1)
    errors.quantity = "Atleast 1 item needs to be added";
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const validateOrderCreate = (data) => {
  let errors = {};
  if (isEmpty(data)) errors.cart = "Cart is empty";
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = {
  validateCartAdd,
  validateOrderCreate,
};
