import authReducer, * as authreducer from "./auth-reducer";

describe("actions", () => {
  it("resetError", () => {
    const expectedAction = {
      type: authreducer.RESET_ERROR,
      error: ""
    };

    expect(authreducer.resetError()).toEqual(expectedAction);
  });

  it("authUser", () => {
    const user = {
      firstName: "Testy",
      lastName: "McTesterton"
    };

    const expectedAction = {
      type: authreducer.AUTH_USER,
      user,
      isFecthing: false,
      error: "",
      isAuthed: true
    };

    expect(authreducer.authUser(user)).toEqual(expectedAction);
  });

  it("unauthUser", () => {
    const expectedAction = {
      type: authreducer.UNAUTH_USER,
      user: {},
      isAuthed: false
    };

    expect(authreducer.unauthUser()).toEqual(expectedAction);
  });

  it("fetchingUser", () => {
    const expectedAction = {
      type: authreducer.FETCHING_USER,
      isFetching: true
    };

    expect(authreducer.fetchingUser()).toEqual(expectedAction);
  });

  it("fetchingUserFailure", () => {
    const error = "test error";

    const expectedAction = {
      type: authreducer.FETCHING_USER_FAILURE,
      error,
      isFetching: false
    };

    expect(authreducer.fetchingUserFailure(error)).toEqual(expectedAction);
  });
});

describe("authReducer", () => {
  it("should return initial state", () => {
    expect(authReducer(undefined, {})).toEqual({
      isFetching: false,
      error: "",
      isAuthed: false,
      user: {}
    });
  });

  it("FETCHING_USER", () => {
    expect(
      authReducer(undefined, {
        type: authreducer.FETCHING_USER,
        isFetching: true
      })
    ).toEqual({
      isFetching: true,
      error: "",
      isAuthed: false,
      user: {}
    });
  });

  it("AUTH_USER", () => {
    expect(
      authReducer(undefined, {
        type: authreducer.AUTH_USER,
        user: {
          username: "tester"
        },
        isFetching: false,
        error: "",
        isAuthed: true
      })
    ).toEqual({
      user: {
        username: "tester"
      },
      isFetching: false,
      error: "",
      isAuthed: true
    });
  });

  it("UNAUTH_USER", () => {
    expect(
      authReducer(undefined, {
        type: authreducer.UNAUTH_USER,
        user: {},
        isAuthed: false
      })
    ).toEqual({
      user: {},
      isFetching: false,
      error: "",
      isAuthed: false
    });
  });

  it("FETCHING_USER_FAILURE", () => {
    expect(
      authReducer(undefined, {
        type: authreducer.FETCHING_USER_FAILURE,
        isFetching: false,
        error: "test error"
      })
    ).toEqual({
      user: {},
      isFetching: false,
      error: "test error",
      isAuthed: false
    });
  });

  it("should handle RESET_ERROR", () => {
    expect(
      authReducer(undefined, {
        type: authreducer.RESET_ERROR,
        error: ""
      })
    ).toEqual({
      user: {},
      isFetching: false,
      error: "",
      isAuthed: false
    });
  });
});
