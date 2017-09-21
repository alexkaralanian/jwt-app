import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import Profile from "../../components/Profile/Profile";
import { logout } from "../../reducers/auth-reducer";

class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout();
    this.props.history.push("/login");
  }

  render() {
    return (
      <Profile
        logout={this.handleLogout}
        user={this.props.user}
        isAuthed={this.props.isAuthed}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user,
  isAuthed: state.authReducer.isAuthed
});

const mapDispatchToProps = { logout };

ProfileContainer.defaultProps = {
  logout: () => {},
  isAuthed: false,
  user: {}
};

ProfileContainer.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthed: PropTypes.bool.isRequired,
  user: PropTypes.object
};

export const Unwrapped = ProfileContainer;

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
