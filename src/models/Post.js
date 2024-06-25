const { Schema, model } = require("mongoose");

const Post = new Schema({
<<<<<<< Updated upstream:src/models/Post.js
    title: {type: String, required: true},
    text: {type: String, required: true}
})
=======
  title: { type: String, required: true },
  text: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});
>>>>>>> Stashed changes:models/Post.js

module.exports = model("Post", Post);
