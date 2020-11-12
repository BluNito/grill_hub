const convertToArray = (list) => {
  if (!list) return null;
  if (typeof list === typeof []) return list;
  else return JSON.parse(list);
};
const convertStringToArray = (list) => {
  if (!list) return null;
  return list.split(",");
};

module.exports = { convertToArray, convertStringToArray };
