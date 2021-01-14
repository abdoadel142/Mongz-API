const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const UserAdmin = require("../models/adminUser");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("validation Failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  console.log(email);
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        email: email,
        password: hashedPw,
        name: name,
      });
      return user.save();
    })
    .then((result) => {
      res.status(200).json({ message: "User created", userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log("POST Login");
  console.log("Email: ", email);
  console.log("Password: ", password);

  let loadedUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("A user this email could not be found");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("wrong password");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: email,
          userId: loadedUser._id.toString(),
        },
        "secret",
        { expiresIn: "1h" }
      );
      console.log("Token: ", token);
      res.status(200).json({
        message: "User Login",
        token: token,
        userId: loadedUser._id.toString(),
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

/////////

exports.adminLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log("POST Login");
  console.log("Email: ", email);
  console.log("Password: ", password);

  let loadedUser;
  UserAdmin.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("A user this email could not be found");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("wrong password");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: email,
          userId: loadedUser._id.toString(),
        },
        "secret",
        { expiresIn: "1h" }
      );
      console.log("Token: ", token);
      res.status(200).json({
        message: "User Login",
        token: token,
        userId: loadedUser._id.toString(),
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
////

exports.adminSignup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("validation Failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const name = req.body.adminName;
  const email = req.body.email;
  const password = req.body.password;
  console.log(name);
  console.log(password);
  console.log(email);
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new UserAdmin({
        email: email,
        password: hashedPw,
        name:name
      });
      return user.save();
    })
    .then((result) => {
      console.log("success");
      res.status(200).json({ message: "User created", userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
