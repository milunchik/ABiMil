const express = require("express");
const router = express.Router();
const controllers = require("../controllers/profControllers");
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

router.get("/:userId/posts", isAuth, controllers.getPosts);
router.get("/:username/newpost", isAuth, controllers.getAddPage);
router.post("/:username/newpost", isAuth, controllers.postPost);

router.put("/update/:id", isAuth, controllers.updatePost);
router.delete("/delete/:id", isAuth, controllers.deletePost);

module.exports = router;
