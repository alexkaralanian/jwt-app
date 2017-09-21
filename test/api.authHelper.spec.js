const getTokenFromHeader = require("../server/api/auth/authHelper")
  .getTokenFromHeader;
const chai = require("chai");

const expect = chai.expect;

describe("authHelper functions", () => {
  it("getTokenFromHeader returns null if there is no token in auth header", () => {
    const req = { headers: {} };
    const result = getTokenFromHeader(req);
    expect(result).to.equal(null);
  });

  it("getTokenFromHeader returns the token when provided", () => {
    const token = "some.random.token";
    const authorization = `Token ${token}`;
    const req = { headers: { authorization } };
    const result = getTokenFromHeader(req);
    expect(result).to.equal("some.random.token");
  });
});
