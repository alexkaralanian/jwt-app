import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";
import axios from "axios";
// import { GoogleSignupButton } from './SignupButtons'
import Signup from "../../components/LoginPage/Signup";
import {
  fetchingUserFailure,
  fetchAndHandleAuthedUser,
  resetError
} from "../../reducers/auth-reducer";

class SignupContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.initialState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.resetError();
  }

  initialState() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
  }

  signup(user) {
    axios
      .post(`/api/auth/signup`, user)
      .then(response => {
        if (response.data.error) {
          console.error("SIGNUP FAILURE");
          this.props.fetchingUserFailure(response.data.error.message);
        } else {
          console.log("SIGNUP SUCCESS!!");
          this.props.fetchAndHandleAuthedUser(response.data);
          this.reset();
          this.props.history.push("/profile");
        }
      })
      .catch(() => {
        this.props.fetchingUserFailure("Error Signing Up");
      });
  }

  handleSubmit(event) {
    event.preventDefault();

    const user = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      password: event.target.password.value
    };

    this.signup(user);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  reset() {
    this.setState(this.initialState);
  }

  render() {
    return (
      <Signup
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        email={this.state.email}
        password={this.state.password}
        isFetching={this.props.isFetching}
        onAuth={this.handleAuth}
        error={this.props.error}
      />
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.authReducer.isFetching,
  error: state.authReducer.error
});

const mapDispatchToProps = {
  fetchingUserFailure,
  fetchAndHandleAuthedUser,
  resetError
};

SignupContainer.defaultProps = {
  error: "",
  isFetching: false,
  fetchingUserFailure: () => {},
  fetchAndHandleAuthedUser: () => {},
  resetError: () => {}
};

SignupContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetchingUserFailure: PropTypes.func.isRequired,
  fetchAndHandleAuthedUser: PropTypes.func.isRequired,
  resetError: PropTypes.func.isRequired
};

export const Unwrapped = SignupContainer;

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);
