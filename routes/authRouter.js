const Router = require("express");
const router = new Router();
const controller = require("../controlllers/authControllers");
const { check } = require("express-validator");
const isAuth = require("../middleware/isAuth");

router.post("/sign-in", controller.login);
router.post(
  "/sign-up",
  [
    check("username", "The name can`t be empty").notEmpty(),
    check("password", "Password have to be from 4 to 10 symbols").isLength({
      min: 4,
      max: 10,
    }),
  ],
  controller.registration
);

router.get("/reset", isAuth, controller.getReset);
router.post("/reset", isAuth, controller.postReset);

router.get("/reset/:token", isAuth, controller.getNewPassword);
router.post("/newpassword", isAuth, controller.postNewPassword);

router.get("/logout", controller.logout);

module.exports = router;
