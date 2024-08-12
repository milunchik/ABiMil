const { Schema, model } = require("mongoose");

const Post = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now(), required: true },
});

module.exports = model("Post", Post);
