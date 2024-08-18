const jwt = require("jsonwebtoken");
const { secret } = require("../src/config.js");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "The user is not authorized" });
    }
    const decodedData = jwt.verify(token, secret);
    req.user = decodedData;
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "The user is not authorized" });
  }
};
