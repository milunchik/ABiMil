const jwt = require("jsonwebtoken");
const { secret } = require("./config");

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: "The user is not authorized" });
      }
      const decodedToken = jwt.verify(token, secret);
      const { roles: userRoles } = decodedToken;

      let hasRole = false;
      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });

      if (!hasRole) {
        return res.status(403).json({ message: "You do not have access" });
      }
      next();
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "The user is not authorized" });
    }
  };
};
