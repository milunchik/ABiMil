const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const profRouter = require("./routes/profRouters");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/profile", profRouter);
app.use("/auth", authRouter);

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/sign-in", (req, res) => {
  res.render("auth/sign-in");
});

app.get("/sign-up", (req, res) => {
  res.render("auth/sign-up");
});

app.get("/admin", (req, res) => {
  res.render("auth/admin");
});

app.post("/profile", (req, res) => {
  let username = req.body.username;
  let userId = req.body.userId;
  if (username) {
    res.redirect(`/profile/${username}?userId=${userId}`);
  } else {
    res.status(400).send({ message: "Error" });
  }
});

app.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: "1" });
  res.redirect("/");
});

module.exports = app;
