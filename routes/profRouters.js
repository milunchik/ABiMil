const express = require("express");
const router = express.Router();
const controllers = require("../controlllers/profControllers");
const isAuth = require("../middleware/isAuth");
const upload = require("../middleware/upload");

router.get("/:username", isAuth, controllers.getProfile);
router.get("/:username/update", isAuth, controllers.getEditProfilePage);
router.post(
  "/:username/update",
  isAuth,
  upload.single("avatar"),
  controllers.EditProfile
);

router.get("/:userId/allUserPosts", isAuth, controllers.getPosts);
router.get("/:username/addpost", isAuth, controllers.getAddPage);
router.post("/post", isAuth, controllers.postPost);

router.put("/update/:id", isAuth, controllers.updatePost);
router.delete("/delete/:id", isAuth, controllers.deletePost);

module.exports = router;
