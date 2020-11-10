const safeAssign = (main, alt) => {
  if (main == null || main == undefined) return alt;
  else return main;
};

module.exports = safeAssign;
