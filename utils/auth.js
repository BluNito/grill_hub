const jwt = require("jsonwebtoken");
const { encryptKey } = require("../config/keys");

const isUser = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) return res.status(203).json({ message: "Unauthorized Access" });
  token = token.slice(7, token.length);
  try {
    const payload = jwt.verify(token, encryptKey);
    if (payload.clearance >= 1) {
      req.user = {
        id: payload.id,
      };
      next();
    } else {
      return res.status(203).json({ message: "Unauthorized Access" });
    }
  } catch (e) {
    console.log(e);
    return res.status(203).json({ message: "Unauthorized Access" });
  }
};

const isMod = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(203).json({
      message: "unauthorized",
    });
  } else {
    token = token.slice(7, token.length);
    jwt.verify(token, encryptKey, (err, payload) => {
      if (err) {
        return res.status(203).json({
          message: "unauthorised",
        });
      } else {
        if (payload.clearance >= 5) {
          req.user = {
            id: payload.id,
          };
          next();
        } else {
          return res.status(203).json({
            message: "unauthorized",
          });
        }
      }
    });
  }
};

module.exports = {
  isUser,
  isMod,
};
