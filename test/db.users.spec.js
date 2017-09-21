const User = require("../db/models/users");
const chai = require("chai");

const expect = chai.expect;

describe("Users model", () => {
  beforeEach("Sync and empty our user table", done => {
    User.sync({ force: true })
      .then(() => {
        done();
      })
      .catch(done);
  });

  beforeEach("Populate information", () => {
    const creatingUser1 = User.create({
      firstName: "Jimmy",
      lastName: "Fallon",
      isAdmin: true,
      email: "jimmy.fallon@gmail.com",
      password: "123"
    });

    const creatingUser2 = User.create({
      firstName: "Robert",
      lastName: "Deniro",
      isAdmin: false,
      email: "bobbyd@gmail.com",
      password: "123"
    });

    return Promise.all([creatingUser1, creatingUser2]);
  });

  it("should exist", () => {
    expect(User).to.be.an("object");
  });

  describe("authenticate instance method", () => {
    const jimmyFallon = User.findOne({
      where: {
        email: "jimmy.fallon@gmail.com"
      }
    });

    it("should exist", () => {
      jimmyFallon.then(user => {
        expect(user.authenticate).to.be.a("function");
      });
    });

    it("should authenticate a valid password", () => {
      jimmyFallon.then(user => {
        user
          .authenticate("123")
          .then(result => {
            expect(result).to.equal(true);
          })
          .catch(err => {
            console.error(err);
          });
      });
    });

    it("should reject an invalid password", () => {
      jimmyFallon.then(user => {
        user
          .authenticate("456")
          .then(result => {
            expect(result).to.equal(false);
          })
          .catch(err => {
            console.error(err);
          });
      });
    });
  });

  describe("generateJWT instance method", () => {
    const robertDeniro = User.findOne({
      where: {
        email: "bobbyd@gmail.com"
      }
    });

    it("should exist", () => {
      robertDeniro.then(user => {
        expect(user.generateJWT).to.be.a("function");
      });
    });
  });

  describe("generateJWT instance method", () => {
    const robertDeniro = User.findOne({
      where: {
        email: "bobbyd@gmail.com"
      }
    });

    it("should exist", () => {
      robertDeniro.then(user => {
        expect(user.generateJWT).to.be.a("function");
      });
    });
  });

  describe("toAuthJSON instance method", () => {
    const robertDeniro = User.findOne({
      where: {
        email: "bobbyd@gmail.com"
      }
    });

    it("should exist", () => {
      robertDeniro.then(user => {
        expect(user.toAuthJSON).to.be.a("function");
      });
    });
  });
});
