const express = require("express");
const User = require("../../../db/models/users");

// const auth = require("./authHelper").auth;
const router = express.Router();

// SIGNUP
router.post("/signup", (req, res, next) => {
  if (!req.body.firstName) {
    return res.json({
      error: {
        status: "422",
        message: "First name can't be blank"
      }
    });
  }

  if (!req.body.lastName) {
    return res.json({
      error: {
        status: "422",
        message: "Last name can't be blank"
      }
    });
  }

  if (!req.body.email) {
    return res.json({
      error: {
        status: "422",
        message: "Email can't be blank"
      }
    });
  }

  if (!req.body.password) {
    return res.json({
      error: {
        status: "422",
        message: "Password can't be blank"
      }
    });
  }

  return User.findOrCreate({
    where: {
      email: req.body.email
    },
    defaults: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password
    }
  })
    .spread((user, created) => {
      if (!created) {
        res.json({
          error: {
            message: "User already exists. Please login"
          }
        });
      } else if (created) {
        res.json(user.toAuthJSON());
      } else {
        res.sendStatus(401);
      }
    })
    .catch(next);
});

// LOGIN
router.post("/login", (req, res) => {
  if (!req.body.email) {
    return res.json({
      error: {
        status: "422",
        message: "Email can't be blank"
      }
    });
  }

  if (!req.body.password) {
    return res.json({
      error: {
        status: "422",
        message: "Password can't be blank"
      }
    });
  }

  return User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.json({
          error: {
            message: "Invalid username"
          }
        });
      }

      return user
        .authenticate(req.body.password)
        .then(ok => {
          if (!ok) {
            return res.json({
              error: {
                message: "Invalid password"
              }
            });
          }

          return res.status(200).json(user.toAuthJSON());
        })
        .catch(err => {
          console.error(err);
        });
    })
    .catch(err => {
      console.error(err);
    });
});

// TEST

router.get("/test", (req, res) => {
  res.json("TEST SUCCESSFUL");
});

module.exports = router;
