const supertest = require("supertest");
const app = require("../server/app");

const agent = supertest.agent(app);
const User = require("../db/models/users");

describe("http requests", () => {
  let user;

  before(done => {
    User.create({
      firstName: "Jennifer",
      lastName: "Lawrence",
      email: "jlaw@gmail.com",
      password: "123"
    })
      .then(obj => {
        user = obj;
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  describe("POST /api/auth/signup", () => {
    it("responds with 200", done => {
      agent
        .post("/api/auth/signup")
        .send(user)
        .expect(200, done);
    });
  });

  describe("POST /api/auth/login", () => {
    it("responds with 200", done => {
      agent
        .post("/api/auth/login")
        .send({
          email: "jlaw@gmail.com",
          password: "123"
        })
        .expect(200, done);
    });
  });

  describe("POST /api/auth/google/login", () => {
    xit("recieves a Google Token");

    xit("responds with 200", done => {
      agent
        .post("/api/auth/google/login")
        .send({
          email: "jlaw@gmail.com",
          password: "123"
        })
        .expect(200, done);
    });
  });
});
