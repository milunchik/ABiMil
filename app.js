const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const profRouter = require("./routes/profRouters");

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
  res.render("sign-in");
});

app.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

app.get("/admin", (req, res) => {
  res.render("admin");
});

app.get("/basic", (req, res) => {
  let username = { username: req.query.username };
  let userId = req.body.userId;
  if (username) {
    res.redirect(`/profile/${username}?userId=${userId}`);
  } else {
    res.status(400).send({ message: "Error" });
  }
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
