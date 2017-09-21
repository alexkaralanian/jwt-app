import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import hello from "hellojs/dist/hello.all";
import React from "react";
import Login from "../../components/LoginPage/Login";
import {
  isAuthenticated,
  fetchingUserFailure,
  fetchAndHandleAuthedUser,
  resetError
} from "../../reducers/auth-reducer";

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);

    const initialState = {
      email: "",
      password: ""
    };

    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reset = this.reset.bind(this);
    this.login = this.login.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
    this.googleAuth = this.googleAuth.bind(this);
  }

  componentDidMount() {
    hello.init({
      google:
        "926691525297-7t7i19u591cgcutgil63i5lutnc4g2j9.apps.googleusercontent.com"
    });
  }

  componentWillUnmount() {
    this.props.resetError();
  }

  handleAuth() {
    this.props.isAuthenticated();
  }

  reset() {
    this.setState(this.initialState);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  login(email, password) {
    axios
      .post(`/api/auth/login`, {
        email,
        password
      })
      .then(response => {
        if (response.data.error) {
          console.error("LOGIN FAILURE");
          this.props.fetchingUserFailure(response.data.error.message);
        } else {
          console.log("LOGIN SUCCESS");
          this.props.fetchAndHandleAuthedUser(response.data);
          this.reset();
          this.props.history.push("/profile");
        }
      })
      .catch(() => {
        this.props.fetchingUserFailure("Error Logging In");
      });
  }

  googleAuth() {
    hello("google")
      .login({
        scope: "email, profile"
        // display: "page"
      })
      .then(res => {
        const gToken = res.authResponse.access_token;
        axios
          .post("/api/auth/google/login", {
            gToken
          })
          .then(response => {
            this.props.fetchAndHandleAuthedUser(response.data);
            this.props.history.push("/profile");
          });
      });
  }

  handleSubmit(event) {
    event.preventDefault();

    const user = {
      email: event.target.email.value,
      password: event.target.password.value
    };

    this.login(user && user.email, user.password);
  }

  render() {
    return (
      <Login
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        email={this.state.email}
        password={this.state.password}
        isFetching={this.props.isFetching}
        onAuth={this.handleAuth}
        error={this.props.error}
        googleAuth={this.googleAuth}
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
  isAuthenticated,
  resetError
};

LoginContainer.defaultProps = {
  error: "",
  isFetching: false,
  fetchingUserFailure: () => {},
  fetchAndHandleAuthedUser: () => {},
  isAuthenticated: () => {},
  resetError: () => {}
};

LoginContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetchingUserFailure: PropTypes.func.isRequired,
  fetchAndHandleAuthedUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.func.isRequired,
  resetError: PropTypes.func.isRequired
};

export const Unwrapped = LoginContainer;

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
