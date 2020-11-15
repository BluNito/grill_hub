const jwt = require("jsonwebtoken");
const { encryptKey } = require("../config/keys");

const isUser = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "Unauthorized Access" });
  token = token.slice(7, token.length);
  try {
    const payload = jwt.verify(token, encryptKey);
    if (payload.clearance >= 1) {
      req.user = {
        id: payload.id,
      };
      next();
    } else {
      return res.status(401).json({ error: "Unauthorized Access" });
    }
  } catch (e) {
    console.log(e);
    return res.status(401).json({ error: "Unauthorized Access" });
  }
};

const isAdmin = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "Unauthorized Access" });
  token = token.slice(7, token.length);
  try {
    const payload = jwt.verify(token, encryptKey);
    if (payload.clearance >= 5) {
      req.user = {
        id: payload.id,
      };
      next();
    } else {
      return res.status(401).json({ error: "Unauthorized Access" });
    }
  } catch (e) {
    console.log(e);
    return res.status(401).json({ error: "Unauthorized Access" });
  }
};

module.exports = {
  isUser,
  isAdmin,
};
