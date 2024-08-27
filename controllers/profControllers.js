const Post = require("../models/Post");
const User = require("../models/User");

const newError = require("./error.js").newError;

const getProfile = async (req, res, next) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username: username });
    if (!user) {
      res.status(404).json({ message: "User not found!" });
    }
    return res.render("auth/profile", {
      username: user.username,
      bio: user.bio,
      avatar: user.avatar,
      userId: user._id,
      posts: user.posts || [],
      isAuth: res.locals.isAuth,
    });
  } catch (err) {
    newError(err, next);
  }
};

const getPosts = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const posts = await Post.find({ userId: userId });
    return res.status(200).json({ posts: posts, userId });
  } catch (err) {
    newError(err, next);
  }
};

const getAddPage = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const username = req.params.username;
    return res.render("prof/add-post", { username, userId });
  } catch (err) {
    newError(err, next);
  }
};

const getEditProfilePage = async (req, res, next) => {
  try {
    const username = req.params.username;
    return res.status(200).render("prof/edit-profile", { username });
  } catch (err) {
    newError(err, next);
  }
};

const EditProfile = async (req, res, next) => {
  try {
    const oldUsername = req.params.username;
    const username = req.body.username;
    const bio = req.body.bio;
    let avatar;
    if (req.file) {
      avatar = req.file.path.replace(/\\/g, "/");
    }
    const user = await User.findOneAndUpdate(
      { username: oldUsername },
      {
        username: username,
        bio: bio,
        avatar: avatar,
      },
      { new: true }
    );
    await user.save();
    return res.status(201).redirect(`/profile/${username}`);
  } catch (err) {
    newError(err, next);
  }
};

const postPost = async (req, res, next) => {
  try {
    const username = req.params.username;
    const { title, text } = req.body;
    const userId = req.user.id;
    let imgUrl;
    if (req.file) {
      imgUrl = req.file.path.replace(/\\/g, "/");
    }
    const newPost = await Post.create({
      title,
      text,
      userId,
      imgUrl,
    });

    await User.findByIdAndUpdate(userId, { $push: { posts: newPost._id } });
    return res.status(201).redirect(`/profile/${username}`);
  } catch (err) {
    newError(err, next);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const username = req.params.username;
    const { id } = req.params;
    const { title, text } = req.body;
    await Post.findByIdAndUpdate(
      id,
      {
        title,
        text,
      },
      { new: true }
    );
    return res.status(201).redirect(`/profile/${username}`);
  } catch (err) {
    newError(err, next);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletePost = await Post.findByIdAndDelete(id);
    if (!deletePost) {
      return res.status(401).json({ message: "Post not found" });
    }
    await User.findByIdAndUpdate(deletePost.userId, { $pull: { posts: id } });

    return res.status(201).json({ message: "Post deleted" });
  } catch (err) {
    newError(err, next);
  }
};

module.exports = {
  getProfile,
  getPosts,
  postPost,
  updatePost,
  deletePost,
  getAddPage,
  getEditProfilePage,
  EditProfile,
};
