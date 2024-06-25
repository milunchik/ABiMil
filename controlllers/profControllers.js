const PostModel = require("../models/Post");

const getProfile = async (req, res) => {
  try {
    const userId = req.user && req.user._id;
    const username = req.params.username;
    if (username) {
      res.render("prof/profile", { username, userId });
    } else {
      res.status(400).send("Username is required");
    }
  } catch (err) {
    console.log(err);
  }
};

const getPosts = async (req, res) => {
  const userId = req.params.userId;
  try {
    const posts = await PostModel.find({ userId: userId });
    res.status(200).json({ posts });
  } catch (err) {
    res.status(400).send(err);
  }
};

const postPost = async (req, res) => {
  try {
    const { title, text } = req.body;
    const newPost = await PostModel.create({ title, text });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, text } = req.body;
    const updatePost = await PostModel.findByIdAndUpdate(id, { title, text });
    res.status(200).json(updatePost);
  } catch (err) {
    res.status(400).send(err);
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletePost = await PostModel.findByIdAndDelete(id);
    if (!deletePost) {
      return res.status(401).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  getProfile,
  getPosts,
  postPost,
  updatePost,
  deletePost,
  // getNewPost,
};
