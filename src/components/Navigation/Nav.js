import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.css";

function Profile({ isAuthed }) {
  return isAuthed === true ? (
    <ul className="nav">
      <li>
        <NavLink activeClassName="active" to="/profile">
          Profile
        </NavLink>
      </li>
    </ul>
  ) : null;
}

function Login({ isAuthed }) {
  return isAuthed === false ? (
    <ul className="nav">
      <li>
        <NavLink activeClassName="active" to="/login">
          Login
        </NavLink>
      </li>
    </ul>
  ) : null;
}

function Navigation({ isAuthed }) {
  return (
    <div className="navContainer">
      <ul className="nav">
        <li>
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        <Login isAuthed={isAuthed} />
        <Profile isAuthed={isAuthed} />
      </ul>
    </div>
  );
}

Profile.defaultProps = Login.defaultProps = Navigation.defaultProps = {
  isAuthed: false
};

Profile.propTypes = Login.propTypes = Navigation.propTypes = {
  isAuthed: PropTypes.bool.isRequired
};

export default Navigation;
