const forceToInteger = (value) => {
  if (typeof value !== typeof 0) return parseInt(value);
  else return value;
};

module.exports = {
  forceToInteger,
};
