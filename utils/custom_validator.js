const validator = require("validator");
const safeAssign = require("./safe_assign");

const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0) ||
    (typeof value === "Array" && value.length === 0)
  );
};

const isEmail = (value) => {
  if (!isEmpty(value)) return validator.isEmail(value);
  else return false;
};

const isLength = (value, { min, max } = {}) => {
  return validator.isLength(safeAssign(value, ""), { min: min, max: max });
};

const isEqual = (a, b) => {
  return validator.equals(safeAssign(a, ""), safeAssign(b, ""));
};

module.exports = { isEmpty, isEmail, isLength, isEqual };
