import React from "react";
import PropTypes from "prop-types";
// import {GoogleSignupButton} from './SignupButtons'
import { Link } from "react-router-dom";
import "./LoginPage.css";

const Login = props => (
  <div className="container">
    <div className="centeredContainer">
      <div className="borderBox ">
        <div className="loginFormHeader">
          <div className="loginIcon">
            <i className="fa fa-shield fa-5x" />
          </div>
        </div>

        <form id="login" onSubmit={props.handleSubmit}>
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
                <i className="fa fa-lock fa-1x" />
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
                className="signin btn btn-primary"
                value="Sign In"
              />
            </div>
          </div>
        </form>

        <div>
          <button
            className="google btn btn-social btn-google"
            onClick={props.googleAuth}
          >
            <span className="fa fa-google" />Login With Google
          </button>
        </div>

        <div>
          <p className="signupRedirect">
            <Link to="/signup">No account? Signup Here</Link>
          </p>
        </div>

        <div>{props.error ? <p className="error">{props.error}</p> : null}</div>
      </div>
    </div>
  </div>
);

Login.defaultProps = {
  email: "",
  password: "",
  error: "",
  handleChange: () => {},
  handleSubmit: () => {}
};

Login.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  // isFetching: PropTypes.bool.isRequired,
  // onAuth: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired
};

export default Login;
