const newError = (err, next) => {
  const error = new Error(err);
  error.statusCode = 500;
  return next(error);
};

const get500 = (err, req, res, next) => {
  res.status(500).render("error/500", {
    isAuth: res.locals.isAuth,
  });
  next(err);
};

module.exports = {
  get500,
  newError,
};
