const { isEmpty, isEmail, isLength, isEqual } = require("../custom_validator");

const validateDishEntry = (data) => {
  let errors = {};
  if (isEmpty(data.name)) errors.name = "Name is required";
  else if (!isLength(data.name, { min: 2, max: 20 }))
    errors.name = "Name must be atleast 2 chars long";
  if (isEmpty(data.price)) errors.price = "Price is required";
  if (isEmpty(data.type)) errors.type = "Type is required";
  else if (!isLength(data.type, { min: 1 }))
    errors.type = "Dish must have atleast 1 type";
  if (isEmpty(data.desc)) errors.desc = "Description is required";
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const validateDishUpdate = (data) => {
  let errors = {};
  if (isEmpty(data.name)) errors.name = "Name is required";
  else if (isLength(data.name, { min: 2, max: 20 }))
    errors.name = "Name must be atleast 2 chars long";
  if (isEmpty(data.price)) errors.price = "Price is required";
  if (isEmpty(data.type)) errors.type = "Type is required";
  else if (isLength(data.type, { min: 1 }))
    errors.type = "Dish must have atleast 1 type";
  if (isEmpty(data.desc)) errors.desc = "Description is required";
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = {
  validateDishEntry,
  validateDishUpdate,
};
