const Router = require("express");
const router = new Router();
const authControllers = require("../controlllers/authControllers");
const { check } = require("express-validator");
const isAuth = require("../middleware/isAuth");

router.get("/", isAuth, authControllers.getAllPosts);

router.post("/sign-in", authControllers.login);
router.post(
  "/sign-up",
  [
    check("username", "The name can`t be empty").notEmpty(),
    check("password", "Password have to be from 4 to 10 symbols").isLength({
      min: 4,
      max: 10,
    }),
  ],
  authControllers.registration
);

router.get("/reset", isAuth, authControllers.getReset);
router.post("/reset", isAuth, authControllers.postReset);

router.get("/reset/:token", isAuth, authControllers.getNewPassword);
router.post("/newpassword", isAuth, authControllers.postNewPassword);

router.get("/logout", authControllers.logout);

module.exports = router;
