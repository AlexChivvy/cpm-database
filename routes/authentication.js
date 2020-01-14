const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/signup", (req, res, next) => {
  res.render("authentication/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  // res.send('hi')
  if (username === "" || password === "") {
    res.render("authentication/signup", {
      errorMessage: "Indicate a username and a password to sign up",
      error: true
    });
    return;
  }

  User.findOne({
      "username": username
    })
    .then(user => {
      if (user !== null) {
        res.render("authentication/signup", {
          errorMessage: "The username already exists!"
        });
        return;
      }

      User.create({
          username,
          password: hashPass
        })
        .then(() => {
          res.redirect("/");
        })
        .catch(error => {
          console.log(error);
        })
    })
    .catch(error => {
      next(error);
    })
});

router.get("/login", (req, res, next) => {
  res.render("authentication/login");
});

router.post("/login", (req, res, next) => {
  const theUsername = req.body.username;
  const thePassword = req.body.password;

  if (theUsername === "" || thePassword === "") {
    res.render("authentication/login", {
      errorMessage: "Please enter both, username and password to sign up."
    });
    return;
  }

  User.findOne({
      "username": theUsername
    })
    .then(user => {
      if (!user) {
        res.render("authentication/login", {
          errorMessage: "The username doesn't exist."
        });
        return;
      }
      if (bcrypt.compareSync(thePassword, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;
        res.redirect("/");
      } else {
        res.render("authentication/login", {
          errorMessage: "Incorrect password"
        });
      }
    })
    .catch(error => {
      next(error);
    })
});

module.exports = router;