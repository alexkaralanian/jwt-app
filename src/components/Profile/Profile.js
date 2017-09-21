import PropTypes from "prop-types";
import React from "react";
import { Redirect } from "react-router-dom";
import "./styles.css";
import profilePic from "./img/img-1.jpg"
const Profile = ({ isAuthed, user, logout }) =>
  !isAuthed
    ? <Redirect
        to={{
          pathname: "/login"
        }}
      />
    : <div className="container">
        <div className ="centeredContainer">
          <h3 className="userName">
            Hello {user.firstName} {user.lastName}!
          </h3>
          <img
            className="profilePic"
            alt="user profile pic"
            src={user.photo ? user.photo : profilePic }
          />
          <button className="logout btn btn-primary" onClick={logout}>
            LOGOUT
          </button>
        </div>
      </div>;

Profile.defaultProps = {
  isAuthed: false,
  logout: () => {},
  user: {}
};

Profile.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default Profile;
