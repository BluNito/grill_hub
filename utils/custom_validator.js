const validator = require("validator");
const safeAssign = require("./safe_assign");

const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === typeof {} && Object.keys(value).length === 0) ||
    (typeof value === typeof "" && value.trim().length === 0) ||
    (typeof value === typeof [] && value.length === 0)
  );
};

const isEmail = (value) => {
  if (!isEmpty(value)) return validator.isEmail(value);
  else return false;
};

const isLength = (value, { min, max } = {}) => {
  if (typeof value === typeof "" || typeof value === typeof []) {
    let minValid, maxValid;
    if (min == null) minValid = true;
    else if (value.length >= min) minValid = true;
    if (max == null) maxValid = true;
    else if (value.length <= max) maxValid = true;
    return minValid && maxValid;
  }
  return false;
};

const isEqual = (a, b) => {
  return validator.equals(safeAssign(a, ""), safeAssign(b, ""));
};

module.exports = { isEmpty, isEmail, isLength, isEqual };
