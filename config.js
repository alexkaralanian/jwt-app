// config.js

const env = process.env.NODE_ENV;
require("dotenv").config();

const development = {
  app: {
    port: 3001
  },
  db: {
    url: "postgres://localhost:5432/jwt-app",
    logging: false,
    force: true
  },
  secret: process.env.SECRET
};

const test = {
  app: {
    port: 3001
  },
  db: {
    url: "postgres://localhost:5432/jwt_app_test",
    logging: false,
    force: false
  },
  secret: process.env.SECRET
};

// SETUP FOR HEROKU.
const production = {
  app: {
    port: process.env.PORT
  },
  db: {
    url: process.env.DATABASE_URL,
    logging: false,
    force: false
  },
  secret: process.env.SECRET
};

const config = {
  development,
  test,
  production
};

module.exports = config[env];
