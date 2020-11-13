const isUser = (user) => {
  if (user.clearance > 1) return true;
  else return false;
};

const isMod = (user) => {
  if (user.clearance >= 5) return true;
  else return false;
};

module.exports = {
  isUser,
  isMod,
};
