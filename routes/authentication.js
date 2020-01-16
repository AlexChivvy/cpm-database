const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passport = require("passport");
const {
  checkDirector
} = require("../middlewares/roles");

//signup
router.get("/signup", (req, res, next) => {
  res.render("authentication/signup");
});

router.post("/signup", (req, res, next) => {
  const role = req.body.role;
  const username = req.body.username;
  const password = req.body.password;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

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
          password: hashPass,
          role
        })
        .then(() => {
          res.redirect("/app");
        })
        .catch(error => {
          console.log(error);
        })
    })
    .catch(error => {
      next(error);
    })
});


//login
router.get("/login", (req, res, next) => {
  let UserNavData = {
    UserName: "Not Logged In",
    AcessLevel: "No"
  }
  if (req.user) {
    UserNavData.UserName = req.user.username;
    UserNavData.AcessLevel = req.user.role;
  }
  res.render("authentication/login", {UserNavData});
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/app",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true,
}));

//logout
router.get("/logout", (req, res) => {
  const UserNavData = {
    UserName: "Not Logged In",
    AcessLevel: "No"
  }
  if (req.user) {
    UserNavData.UserName = req.user.username;
    UserNavData.AcessLevel = req.user.role;
  }
  req.logout();
  res.redirect("/login");
  res.render({UserNavData});
});

//google
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/private-page",
    failureRedirect: "/login"
  })
);

module.exports = router;