const express = require("express");
const router = express.Router();
const controllers = require("../controlllers/profControllers");
const isAuth = require("../middleware/isAuth");

router.get("/:username", isAuth, controllers.getProfile);
router.get("/:userId/allUserPosts", isAuth, controllers.getPosts);
router.get("/:username/addpost", isAuth, controllers.getAddPage);
router.post("/:userId/newpost", isAuth, controllers.postPost);
router.put("/:userId/updatePost/:id", isAuth, controllers.updatePost);
router.delete("/:userId/deleteUserPost/:id", isAuth, controllers.deletePost);

module.exports = router;
