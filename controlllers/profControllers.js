const Post = require("../models/Post");
const User = require("../models/User");

const getProfile = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username: username });
    if (!user) {
      res.status(404).json({ message: "User not found!" });
    }
    res.render("auth/profile", {
      username: user.username,
      bio: user.bio,
      avatar: user.avatar,
      userId: user._id,
      posts: user.posts || [],
      isAuth: res.locals.isAuth,
    });
  } catch (err) {
    console.log(err);
  }
};

const getPosts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const posts = await Post.find({ userId: userId });
    console.log(posts);
    res.status(200).json({ posts: posts, userId });
  } catch (err) {
    res.status(400).send(err);
  }
};

const getAddPage = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const username = req.params.username;
    console.log("getAddPage: ", userId, username);
    res.render("prof/add-post", { username, userId });
  } catch (err) {
    res.status(404).send(err);
  }
};

const getEditProfilePage = async (req, res, next) => {
  try {
    const username = req.params.username;
    console.log(username);
    res.status(200).render("prof/edit-profile", { username });
  } catch (err) {
    res.status(404).json(err);
  }
};

const EditProfile = async (req, res, next) => {
  try {
    const oldUsername = req.params.username;
    const username = req.body.username;
    const bio = req.body.bio;
    console.log(oldUsername, username, bio);
    let avatar;
    if (req.file) {
      avatar = req.file.path;
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
    res.status(201).redirect(`profile/${username}`);
  } catch (err) {
    res.status(404).json(err);
  }
};

const postPost = async (req, res) => {
  try {
    const username = req.params.username;
    const { title, text } = req.body;
    const userId = req.user.id;
    const post = new Post({
      title,
      text,
      userId,
    });
    const newPost = await post.save();
    console.log(newPost);

    await User.findByIdAndUpdate(userId, { $push: { posts: newPost._id } });

    res.status(201).redirect(`profile/${username}`);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updatePost = async (req, res) => {
  try {
    const username = req.params.username;
    const { id } = req.params;
    const { title, text } = req.body;
    const updatePost = await Post.findByIdAndUpdate(
      id,
      {
        title,
        text,
      },
      { new: true }
    );
    res.status(201).redirect(`profile/${username}`);
  } catch (err) {
    res.status(400).send(err);
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletePost = await Post.findByIdAndDelete(id);
    if (!deletePost) {
      return res.status(401).json({ message: "Post not found" });
    }
    await User.findByIdAndUpdate(deletePost.userId, { $pull: { posts: id } });

    res.status(201).json({ message: "Post deleted" });
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
  getAddPage,
  getEditProfilePage,
  EditProfile,
};
