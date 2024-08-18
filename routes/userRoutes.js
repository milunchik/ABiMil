const express = require("express");
const controllers = require("../controllers/userControllers");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const isAuth = require("../middleware/isAuth");

router.get("/users", isAuth, controllers.getUsers);
router.put("/user/update/:id", isAuth, controllers.updateUser);
router.delete("/user/delete/:id", isAuth, controllers.deleteUser);

router.get("/admin", authMiddleware, isAuth, controllers.adminAuth);

module.exports = router;
