import {
  setToken,
  checkToken,
  getToken,
  getUserProfile
} from "./helperFunctions";

/* -----------------    ACTIONS     ------------------ */

export const AUTH_USER = "AUTH_USER";
export const UNAUTH_USER = "UNAUTH_USER";
export const FETCHING_USER = "FETCHING_USER";
export const FETCHING_USER_FAILURE = "FETCHING_USER_FAILURE";
export const RESET_ERROR = "RESET ERROR";

/* ------------   ACTION CREATORS   -------------- */

export const resetError = () => ({
  type: RESET_ERROR,
  error: ""
});

export const authUser = user => ({
  type: AUTH_USER,
  user,
  isFecthing: false,
  error: "",
  isAuthed: true
});

export const unauthUser = () => ({
  type: UNAUTH_USER,
  user: {},
  isAuthed: false
});

export const fetchingUser = () => ({
  type: FETCHING_USER,
  isFetching: true
});

export const fetchingUserFailure = error => {
  console.warn(error);
  return {
    type: FETCHING_USER_FAILURE,
    error,
    isFetching: false
  };
};

/* ------------       THUNKS     ------------------ */

export const isAuthenticated = () => dispatch => {
  const authed = checkToken();
  if (!authed) {
    dispatch(unauthUser());
    return false;
  }
  dispatch(authUser(getUserProfile(getToken())));
  return true;
};

export const logout = () => dispatch => {
  localStorage.removeItem("token");
  dispatch(unauthUser());
};

export const fetchAndHandleAuthedUser = user => dispatch => {
  dispatch(fetchingUser());
  setToken(user.token);
  dispatch(authUser(getUserProfile(user.token)));
};

/* ------------       REDUCERS     ------------------ */

export const initialState = {
  isFetching: false,
  error: "",
  isAuthed: false,
  user: {}
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_USER:
      return {
        ...state,
        isFetching: action.isFetching
      };

    case AUTH_USER:
      return {
        ...state,
        isFetching: action.isFetching,
        error: action.error,
        user: action.user,
        isAuthed: action.isAuthed
      };

    case UNAUTH_USER:
      return {
        ...state,
        isAuthed: action.isAuthed,
        user: action.user
      };

    case FETCHING_USER_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        error: action.error
      };

    case RESET_ERROR:
      return {
        ...state,
        error: action.error
      };

    default:
      return state;
  }
};

export default authReducer;
