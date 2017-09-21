const http = require("http");
const db = require("../db");
const config = require("../config");

const { app: { port } } = config;

const server = http.createServer();

server.on("request", require("./app"));

db
  .sync()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch(console.error);
