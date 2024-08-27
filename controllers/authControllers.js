const User = require("../models/User.js");
const Role = require("../models/Role.js");
const Post = require("../models/Post.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const newError = require("./error.js").newError;
const { validationResult } = require("express-validator");
const { secret } = require("../src/config.js");
const crypto = require("crypto");

const itemOnPage = 3;

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };

  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

const registration = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Error during registration", errors });
    }
    const { username, password } = req.body;
    const candidate = await User.findOne({ username });

    if (candidate) {
      return res.status(400).json({ message: "The name is already taken" });
    }
    let hashPassword = bcrypt.hashSync(password, 7);

    const userRole = await Role.findOne({ value: "user" });
    const user = new User({
      username,
      password: hashPassword,
      roles: [userRole.value],
    });
    await user.save();

    const token = generateAccessToken(user._id, user.roles);
    return res.json({ token, userId: user._id, message: "User registered" });
  } catch (err) {
    newError(err, next);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (username && password) {
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `User: ${username} is not found` });
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const token = generateAccessToken(user._id, user.roles);

      res.set("Authorization", `Bearer ${token}`);
      res.cookie("jwt", token, { httpOnly: true, secure: false });

      return res.json({ token, userId: user._id, username });
    } else {
      return res.status(400).json({
        message: "Username or Password not present",
      });
    }
  } catch (err) {
    newError(err, next);
  }
};

const getReset = async (req, res) => {
  try {
    res.status(200).render("auth/reset");
  } catch (err) {
    newError(err, next);
  }
};

const postReset = async (req, res) => {
  try {
    const username = req.body.username;
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.redirect("/reset");
    }

    const resetToken = crypto
      .createHash("sha256")
      .update(username)
      .digest("hex");

    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000;

    await user.save();

    res.status(201).redirect(`/reset/${resetToken}`);
  } catch (err) {
    newError(err, next);
  }
};

const getNewPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    res.render("auth/new-password", { token, userId: user._id });
  } catch (err) {
    newError(err, next);
  }
};

const postNewPassword = async (req, res) => {
  try {
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    let resetUser;
    const user = await User.findOne({
      resetToken: passwordToken,
      resetTokenExpiration: { $gt: Date.now() },
      _id: userId,
    });

    if (user) {
      resetUser = user;
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      resetUser.save();
      return res.redirect("/");
    }
  } catch (err) {
    newError(err, next);
  }
};

const getAllPosts = async (req, res) => {
  try {
    const page = +req.query.page || 1;
    let totalProducts;
    const numProducts = await Post.find().countDocuments();
    totalProducts = numProducts;

    const posts = await Post.find()
      .skip((page - 1) * itemOnPage)
      .limit(itemOnPage);

    for (const post of posts) {
      const user = await User.findById(post.userId).lean();
      post.username = user ? user.username : "Unknown";
    }

    res.render("index", {
      isAuth: res.locals.isAuth,
      userId: res.locals.userId,
      username: res.locals.username,
      posts: posts,
      currentPage: page,
      hasNextPage: itemOnPage * page < totalProducts,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalProducts / itemOnPage),
    });
  } catch (error) {
    newError(err, next);
  }
};

const logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports = {
  registration,
  login,
  getReset,
  postReset,
  logout,
  getAllPosts,
  getNewPassword,
  postNewPassword,
};
