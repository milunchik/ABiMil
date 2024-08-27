const jwt = require("jsonwebtoken");
const { secret } = require("../src/config");

function isAuth(req, res, next) {
  const token = req.cookies.jwt;

  if (!token) {
    res.locals.isAuth = false;
    res.locals.userId = null;
    res.locals.username = null;
    return next();
  }

  try {
    const decodedToken = jwt.verify(token, secret);
    req.user = decodedToken;
    res.locals.isAuth = true;
    res.locals.userId = decodedToken.id;
    res.locals.username = decodedToken.username;
    next();
  } catch (err) {
    res.locals.isAuth = false;
    res.locals.userId = null;
    res.locals.username = null;
    next();
  }
}

module.exports = isAuth;
