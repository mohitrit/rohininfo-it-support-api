const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAccessTokenApp = (username) => {
  return jwt.sign(username, process.env.TOKEN_SECRET);
};

const authenticateTokenApp = (req, res, next) => {
  const token = req.headers["authorization"];

  if (token == null)
    return res.status(401).json({ status: 401, message: "Session Expired!" });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(401).json({ status: 401, message: "Session Expired!" });
    req.user = user.user_id;

    next();
  });
};
module.exports = {
    generateAccessTokenApp,
  authenticateTokenApp,
};
