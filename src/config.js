// config.js

const env = process.env.NODE_ENV;

const development = {
  url: "http://localhost:3000"
};

const test = {
  url: "https://jwt-app-server.herokuapp.com"
};

const production = {
  url: "https://jwt-app-server.herokuapp.com"
};

const config = {
  development,
  test,
  production
};

module.exports = config[env];
