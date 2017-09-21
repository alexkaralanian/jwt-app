import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./LoginPage.css";

export default function Signup(props) {
  return (
    <div className="container ">
      <div className="centeredContainer">
        <div className="borderBox ">
          <div className="loginFormHeader">
            <div className="loginIcon">
              <i className="fa fa-shield fa-5x" />
            </div>
          </div>

          <form id="loginform" onSubmit={props.handleSubmit}>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-addon">
                  <i className="fa fa-user" />
                </div>
                <input
                  name="firstName"
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  value={props.firstName}
                  onChange={props.handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
                <div className="input-group-addon">
                  <i className="fa fa-user" />
                </div>
                <input
                  name="lastName"
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  value={props.lastName}
                  onChange={props.handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
                <div className="input-group-addon">
                  <i className="fa fa-envelope" />
                </div>
                <input
                  name="email"
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  value={props.email}
                  onChange={props.handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
                <div className="input-group-addon">
                  <i className="fa fa-lock" />
                </div>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={props.password}
                  onChange={props.handleChange}
                />
              </div>
            </div>
            <div className="buttonGroup">
              <div className="form-group buttonGroup">
                <input
                  type="submit"
                  className="signup btn btn-primary"
                  value="Signup"
                />
              </div>
            </div>
          </form>

          <div>
            <p className="signupRedirect">
              <Link to="/login">Have an account? Login Here</Link>
            </p>
          </div>

          <div>
            {props.error ? <p className="error">{props.error}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

Signup.defaultProps = {
  email: "",
  password: "",
  error: "",
  handleChange: () => {},
  handleSubmit: () => {}
};

Signup.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  // isFetching: PropTypes.bool.isRequired,
  // onAuth: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired
};
