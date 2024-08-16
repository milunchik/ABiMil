const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const profRouter = require("./routes/profRouters");
const userRoutes = require("./routes/userRoutes");
const errorControllers = require("./controllers/error");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/profile", profRouter);
app.use(authRouter);
app.use(userRoutes);

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/sign-in", (req, res) => {
  res.render("auth/sign-in", { isAuth: false });
});

app.get("/sign-up", (req, res) => {
  res.render("auth/sign-up", { isAuth: false });
});

app.get("/admin", (req, res) => {
  res.render("admin", {
    isAuth: res.locals.isAuth,
    userId: res.locals.userId,
    username: res.locals.username,
  });
});

app.post("/profile", (req, res) => {
  if (res.locals.username) {
    res.redirect(`/profile/${res.locals.username}`);
  } else {
    res.status(400).send({ message: "Error" });
  }
});

app.use((req, res, next) => {
  res.status(404).render("errors/404", {
    isAuth: res.locals.isAuth,
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.statusCode === 500) {
    errorControllers.get500;
  }
  next(err);
});

module.exports = app;
