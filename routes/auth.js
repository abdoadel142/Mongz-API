const express = require("express");
const { body } = require("express-validator/check");
const User = require("../models/user");
const router = express.Router();
const authController = require("../controllers/auth");

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("please enter a valid email. ")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-Mail address already exists");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
  ],
  authController.signup
);

router.post("/login", authController.login);
router.post("/adminLogin", authController.adminLogin);
module.exports = router;
