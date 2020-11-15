const convertToArray = (list) => {
  if (!list) return null;
  if (typeof list === typeof []) return list;
  return list.split(",");
};
const convertStringToArray = (list) => {
  if (!list) return null;
  return list.split(",");
};

module.exports = { convertToArray, convertStringToArray };
