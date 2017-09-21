const express = require("express");
const User = require("../../../db/models/users");
const axios = require("axios");

const router = express.Router();

// GOOGLE LOGIN

router.post("/login", (req, res, next) => {
  const token = req.body.gToken;

  axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`
    )
    .then(res => {
      return User.findOrCreate({
        where: {
          googleId: res.data.id
        },
        defaults: {
          email: res.data.email,
          googleAccessToken: token,
          firstName: res.data.given_name,
          lastName: res.data.family_name,
          googlePhoto: res.data.picture
        }
      }).spread((user, created) => {
        return user.toAuthJSON();
      });
    })
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
});

module.exports = router;
