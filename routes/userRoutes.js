const express = require("express");
const controllers = require("../controllers/userControllers");
const router = express.Router();
const authMiddleware = require("../middleware/authMidleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const isAuth = require("../middleware/isAuth");

router.get("/users", controllers.getUsers);
router.put("/user/update/:id", controllers.updateUser);
router.delete("/user/delete/:id", controllers.deleteUser);

router.get("/admin", authMiddleware, controllers.adminAuth);

module.exports = router;
