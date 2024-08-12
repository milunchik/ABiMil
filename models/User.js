const { Schema, model } = require("mongoose");

const User = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: [{ type: String, ref: "Role" }],
  posts: [{ type: Object, ref: "Post" }],
  bio: { type: String, default: "BIO", required: true },
  avatar: { type: String, default: "/img/user-icon1.png", required: true },
});

module.exports = model("User", User);
