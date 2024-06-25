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
    if (posts.userId == userId) {
      res.status(200).json({ posts });
    }
    if (!posts.length) {
      res.status(200).json();
      return console.log("There aren't posts");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

const postPost = async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).send("User ID is required");
  }

  try {
    const { title, text } = req.body;
    if (!title || !text) {
      return res.status(400).send("Title and text are required");
    }
    const post = new PostModel({
      title,
      text,
      userId: userId,
    });
    const newPost = await post.save();
    res.status(200).json(newPost);
  } catch (err) {
    console.log("Error saving post:", err);
    res.status(400).send(err);
  }
};

const getNewPost = async (req, res, next) => {
  try {
    const userId = req.user && req.user._id;
    const username = req.params.username;
    res.render("prof/add-post", { username, userId });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
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
  getNewPost,
};
