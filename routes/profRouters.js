const express = require("express");
const router = express.Router();
const controllers = require("../controlllers/profControllers");

router.get("/:username", controllers.getProfile);
router.get("/:userId/allUserPosts", controllers.getPosts);
router.post("/:userId/userPost", controllers.postPost);
router.put("/:userId/updateUserPost/:id", controllers.updatePost);
router.delete("/:userId/deleteUserPost/:id", controllers.deletePost);

module.exports = router;
