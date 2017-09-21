import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
// import { createLogger } from 'redux-logger';

import authReducer, { isAuthenticated } from "./reducers/auth-reducer";

const rootReducer = combineReducers({
  authReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      // createLogger(),
      thunkMiddleware
    )
  )
);

export default store;

store.dispatch(isAuthenticated());
