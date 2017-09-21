require("../config");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("../db/models/users");

const path = require("path");

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, "../build")));

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API
app.use("/api/auth", require("./api/auth/local"));
app.use("/api/auth/google", require("./api/auth/google"));
app.use("/api/users", require("./api/users"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// ERROR HANDLING MIDDLEWARE

// Sequelize validation errors
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce((errors, key) => {
        errors[key] = err.errors[key].message;
        return errors;
      }, {})
    });
  }
  return next(err);
});

app.use((err, req, res) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal Error");
});

module.exports = app;
