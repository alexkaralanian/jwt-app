import React from "react";
// import PropTypes from 'prop-types'

export const GoogleSignupButton = ({ onAuth, isFetching }) => (
  <div>
    <button className="btn btn-danger" onClick={onAuth}>
      <a target="_self" href="http://localhost:3001/api/auth/login/google">
        {isFetching === true ? "Loading" : "Login with Google"}
      </a>
    </button>
  </div>
);
