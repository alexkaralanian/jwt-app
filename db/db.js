const Sequelize = require("sequelize");
const config = require("../config");

const { db: { url, logging, force } } = config;

const db = new Sequelize(url, {
  logging,
  force,
  define: {
    timestamps: true
  }
});

module.exports = db;
