const Users = require("./users");
const chai = require("chai");

const expect = chai.expect;

describe("Users model", () => {
  beforeEach("Sync and empty our student table", done => {
    Users.sync({ force: true })
      .then(() => {
        done();
      })
      // .catch(function (err) {
      //     done(err);
      // })
      .catch(done);
  });

  beforeEach("Populate information", () => {
    const creatingUser1 = Users.create({
      firstName: "Jimmy",
      lastName: "Fallon",
      isAdmin: true,
      email: "jimmy.fallon@gmail.com"
    });

    const creatingUser2 = Users.create({
      firstName: "Robert",
      lastName: "Deniro",
      isAdmin: false,
      email: "bobbyd@gmail.com"
    });

    const creatingUser3 = Users.create({
      firstName: "Laura",
      lastName: "Dunn",
      isAdmin: false,
      email: "laura.dunn@yahoo.com"
    });

    return Promise.all([creatingUser1, creatingUser2, creatingUser3]);
  });

  it("should exist", () => {
    expect(Users).to.be.an("object");
  });

  // describe("findByCampus instance method", function() {
  //   it("should exist", function() {
  //     expect(Student.findByCampus).to.be.a("function");
  //   });

  //   it("should give us back Emily and Mariana when called with GHA", function() {
  //     return Student.findByCampus("Grace Hopper Academy")
  //       .then(function(foundStudents) {
  //         const justNames = foundStudents
  //           .map(function(student) {
  //             return student.name;
  //           })
  //           .sort();
  //         return justNames;
  //       })
  //       .then(function(names) {
  //         expect(names).to.be.deep.equal(["Emily", "Mariana"]);
  //       });
  //   });
  // });
});
