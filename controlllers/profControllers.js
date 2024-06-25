const PostModel = require("../models/Post");

const getProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const username = req.params.username;
    if (username) {
      res.render("auth/profile", {
        username,
        userId,
        isAuth: res.locals.isAuth,
      });

    } else {
      res.status(400).send("Username is required");
    }
  } catch (err) {
    console.log(err);
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({ userId: req.params.id });
    if (posts === null) {
      console.log("There aren`t posts");
    }
    // console.log(posts);
    res.status(200).json({ posts });
  } catch (err) {
    res.status(400).send(err);
  }
};

const getAddPage = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const username = req.params.username;
    console.log("add-post-info: " + userId, username);

    res.render("prof/add-post.ejs", { username, userId });
  } catch (err) {
    res.status(404).send(err);
  }
};

const getEditProfilePage = async (req, res, next) => {
  try {
    const username = req.params.username;
    res.status(201).render("prof/edit-profile", { username });
  } catch (err) {
    res.status(404).json(err);
  }
};

const EditProfile = async (req, res, next) => {
  try {
    const username = req.body.username;
    const bio = req.body.bio;
    let avatar;
    if (req.file) {
      avatar = req.file.path;
    }
    const user = await User.findOneAndUpdate(
      { username: req.params.username },
      {
        username: username,
        bio: bio,
        avatar: avatar,
      },
      { new: true }
    );
    await user.save();
    res.status(201).json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(404).json(err);
  }
};

const postPost = async (req, res) => {
  try {
    const { title, text } = req.body;
    const userId = req.user.id;
    console.log("Info: " + title, text, userId);
    const post = new PostModel({
      title,
      text,
      userId,
    });
    const newPost = await post.save();
    console.log(newPost);
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, text } = req.body;
    const updatePost = await PostModel.findByIdAndUpdate(
      id,
      {
        title,
        text,
      },
      { new: true }
    );
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
  getAddPage,
  getEditProfilePage,
  EditProfile,
};
