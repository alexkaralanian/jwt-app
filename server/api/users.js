const express = require("express");

const router = express.Router();
const Users = require("../../db/models/users");

router.get("/test", (req, res) => {
  res.json("HELLO USER");
});

module.exports = router;
