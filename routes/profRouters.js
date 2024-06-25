const express = require("express");
const router = express.Router();
const controllers = require("../controlllers/profControllers");

router.get("/:username", controllers.getProfile);
router.get("/:userId/allUserPosts", controllers.getPosts);
router.get("/:userId/new-post", controllers.getNewPost);
router.post("/:userId/userPost", controllers.postPost);
// router.get("/edit-profle");
// router.post("/edit-profle");
router.put("/:userId/updatePost/:id", controllers.updatePost);
router.delete("/:userId/deleteUserPost/:id", controllers.deletePost);

module.exports = router;
